package tom.com.monkeylog.service

import org.springframework.stereotype.Service
import tom.com.monkeylog.common.notNull
import tom.com.monkeylog.dto.statistics.StatisticsResponse
import tom.com.monkeylog.dto.statistics.StatisticsType
import tom.com.monkeylog.mapper.toResponse
import tom.com.monkeylog.model.workout.ExerciseGroup
import tom.com.monkeylog.model.workout.ExerciseRow
import tom.com.monkeylog.service.StatisticsService.Aggregator
import java.time.Instant
import java.util.*

@Service
class StatisticsService(val exerciseGroupService: ExerciseGroupService) {
    fun getStatistics(exerciseId: UUID, type: StatisticsType): List<StatisticsResponse> =
        exerciseGroupService.getByExerciseId(exerciseId)
            .groupBy { it.workout.startDate.notNull() }
            .mapValues { (_, exerciseGroups) ->
                exerciseGroups
                    .flatMap(ExerciseGroup::exerciseRows)
                    .filter { it.lifted }
            }.map { (date, exerciseRows) ->
                getAggregator(type).apply(date, exerciseRows)
            }

    private fun getAggregator(type: StatisticsType) =
        when (type) {
            StatisticsType.MAX_WEIGHT -> maxWeight
            StatisticsType.MAX_REPS -> maxReps
            StatisticsType.MAX_1RM -> maxBrzycki
            StatisticsType.TOTAL_REPS -> totalReps
            StatisticsType.TOTAL_VOLUME -> totalVolume
            StatisticsType.TOTAL_DISTANCE -> totalDistance
            StatisticsType.TOTAL_TIME -> totalTime
        }

    private val maxWeight = Aggregator { date, exerciseRows ->
        val exerciseRow = exerciseRows.maxBy(ExerciseRow::weightNotNull)

        StatisticsResponse(exerciseRow.weightNotNull(), date, exerciseRow.toResponse())
    }

    private val maxReps = Aggregator { date, exerciseRows ->
        val exerciseRow = exerciseRows.maxBy(ExerciseRow::repsNotNull)

        StatisticsResponse(exerciseRow.repsNotNull().toDouble(), date, exerciseRow.toResponse())
    }

    private val totalReps = Aggregator { date, exerciseRows ->
        StatisticsResponse(exerciseRows.sumOf(ExerciseRow::repsNotNull).toDouble(), date)
    }

    private val totalVolume = Aggregator { date, exerciseRows ->
        StatisticsResponse(exerciseRows.sumOf { it.weightNotNull() * it.repsNotNull() }, date)
    }


    private val totalDistance = Aggregator { date, exerciseRows ->
        StatisticsResponse(exerciseRows.sumOf(ExerciseRow::distanceNotNull), date)
    }

    private val totalTime = Aggregator { date, exerciseRows ->
        StatisticsResponse(exerciseRows.sumOf(ExerciseRow::timeNotNull).toDouble(), date)
    }

    private val maxBrzycki = Aggregator { date, exerciseRows ->
        val exerciseRow = exerciseRows.maxBy { it.weightNotNull() * (36 / (37 - it.repsNotNull())) }

        StatisticsResponse(exerciseRow.repsNotNull().toDouble(), date, exerciseRow.toResponse())
    }

    fun interface Aggregator {
        fun apply(date: Instant, exerciseRows: List<ExerciseRow>): StatisticsResponse
    }
}
