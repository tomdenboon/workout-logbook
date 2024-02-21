package tom.com.monkeylog.repository

import jakarta.persistence.EntityManager
import jakarta.persistence.PersistenceContext
import org.springframework.stereotype.Repository
import tom.com.monkeylog.dto.statistics.Interval
import tom.com.monkeylog.dto.statistics.StatisticsResponse
import tom.com.monkeylog.dto.statistics.StatisticsType
import tom.com.monkeylog.dto.workout.ExerciseRowResponse
import java.time.Instant
import java.util.*

@Repository
class StatisticsRepository(
    @PersistenceContext
    val em: EntityManager
) {
    fun totalVolumeUser(userId: UUID): Double {
        return em.createNativeQuery(
            """
                SELECT SUM(er.weight * er.reps)
                FROM exercise_group eg
                     JOIN workout w on eg.workout_id = w.id
                     JOIN exercise_row er on eg.id = er.exercise_group_id
                WHERE w.user_id = '$userId'
                  AND w.workout_type = 'COMPLETED'
                  AND er.lifted IS TRUE;
            """.trimIndent()
        ).singleResult as Double
    }

    fun totalTimeUser(userId: UUID): Double {
        return em.createNativeQuery(
            """
                SELECT EXTRACT(EPOCH FROM SUM(w.end_date - w.start_date))
                FROM workout w
                WHERE w.user_id = '$userId'
                  AND w.workout_type = 'COMPLETED';
            """.trimIndent()
        ).singleResult as Double
    }

    fun totalWorkoutCountUser(userId: UUID): Long {
        return em.createNativeQuery(
            """
                SELECT COUNT(w.id)
                FROM workout w
                WHERE w.user_id = '$userId'
                  AND w.workout_type = 'COMPLETED';
            """.trimIndent()
        ).singleResult as Long
    }

    fun workoutCountUser(userId: UUID, interval: Interval): List<StatisticsResponse> {
        val inter = interval.name.lowercase()
        return em.createNativeQuery(
            """
                SELECT date_trunc($inter, w.start_date), COUNT(w.id)
                FROM workout w
                WHERE w.user_id = '$userId'
                  AND w.workout_type = 'COMPLETED'
                GROUP BY date_trunc($inter, w.start_date)
                ORDER BY date_trunc($inter, w.start_date);
            """.trimIndent()
        ).resultList.map {
            val row = it as Array<*>
            StatisticsResponse(
                row[0] as Instant,
                (row[1] as Long).toDouble(),
            )
        }
    }

    fun getSumStatistics(
        exerciseId: UUID,
        userId: UUID,
        type: StatisticsType
    ): List<StatisticsResponse> {
        val agg = getAggregation(type)

        return em.createNativeQuery(
            """
                SELECT date_trunc('day', w.start_date), CAST(sum($agg)  AS DOUBLE PRECISION) as agg
                FROM exercise_group eg
                     JOIN workout w on eg.workout_id = w.id
                     JOIN exercise_row er on eg.id = er.exercise_group_id
                WHERE eg.exercise_id = '$exerciseId'
                  AND w.workout_type = 'COMPLETED'
                  AND er.lifted IS TRUE
                  AND er.user_id = '$userId'
                GROUP BY date_trunc('day', w.start_date)
                ORDER BY date_trunc('day', w.start_date); 
            """.trimIndent()
        ).resultList.map {
            val row = it as Array<*>
            StatisticsResponse(
                row[0] as Instant,
                row[1] as Double,
            )
        }
    }

    fun getMaxStatistics(
        exerciseId: UUID,
        userId: UUID,
        type: StatisticsType
    ): List<StatisticsResponse> {
        val agg = getAggregation(type)

        return em.createNativeQuery(
            """
                SELECT DISTINCT ON (date_trunc('day', w.start_date)) date_trunc('day', w.start_date),
                                                     CAST($agg AS DOUBLE PRECISION) as agg,
                                                     er.id,
                                                     er.lifted,
                                                     er.weight,
                                                     er.distance,
                                                     er.time,
                                                     er.reps,
                                                     er.rpe
                FROM exercise_group eg
                         JOIN workout w on eg.workout_id = w.id
                         JOIN exercise_row er on eg.id = er.exercise_group_id
                WHERE eg.exercise_id = '$exerciseId'
                  AND w.workout_type = 'COMPLETED'
                  AND er.lifted IS TRUE
                  AND er.user_id = '$userId'
                ORDER BY date_trunc('day', w.start_date), $agg desc;
            """.trimIndent()
        ).resultList.map {
            val row = it as Array<*>
            StatisticsResponse(
                row[0] as Instant,
                row[1] as Double,
                ExerciseRowResponse(
                    row[2] as UUID,
                    row[3] as Boolean,
                    row[4] as Double?,
                    row[5] as Double?,
                    row[6] as Int?,
                    row[7] as Int?,
                    row[8] as Int?,
                )
            )
        }
    }

    fun getAggregation(type: StatisticsType): String =
        when (type) {
            StatisticsType.ONE_RM -> "weight * (1 + reps / 30.0)"
            StatisticsType.VOLUME -> "weight * reps"
            StatisticsType.WEIGHT -> "weight"
            StatisticsType.REPS -> "reps"
            StatisticsType.TIME -> "time"
            StatisticsType.DISTANCE -> "distance"
            StatisticsType.PACE -> "distance / time"
        }
}
