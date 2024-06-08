package tom.com.workout.logbook.model.exercise

import tom.com.workout.logbook.dto.statistics.StatisticsType

enum class ExerciseCategory(val statistics: List<StatisticsType>, val validFields: ValidFields) {
    REPS(listOf(StatisticsType.REPS), ValidFields(reps = true)),
    WEIGHTED(
        listOf(
            StatisticsType.WEIGHT,
            StatisticsType.REPS,
            StatisticsType.ONE_RM,
            StatisticsType.VOLUME
        ),
        ValidFields(reps = true, weight = true)
    ),
    DURATION(listOf(StatisticsType.TIME), ValidFields(time = true)),
    DISTANCE(
        listOf(StatisticsType.DISTANCE, StatisticsType.PACE, StatisticsType.TIME),
        ValidFields(distance = true, time = true)
    );

    data class ValidFields(
        val reps: Boolean = false,
        val weight: Boolean = false,
        val time: Boolean = false,
        val distance: Boolean = false,
    )
}
