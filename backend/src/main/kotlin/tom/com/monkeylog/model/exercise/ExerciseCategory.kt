package tom.com.monkeylog.model.exercise

import tom.com.monkeylog.dto.statistics.StatisticsType

enum class ExerciseCategory(val niceName: String, val statistics: List<StatisticsType>) {
    REPS("Reps", listOf(StatisticsType.MAX_REPS, StatisticsType.TOTAL_REPS)),
    WEIGHTED("Weighted", listOf(StatisticsType.MAX_WEIGHT, StatisticsType.MAX_1RM, StatisticsType.TOTAL_VOLUME)),
    DURATION("Duration", listOf(StatisticsType.TOTAL_TIME)),
    DISTANCE("Distance", listOf(StatisticsType.TOTAL_DISTANCE, StatisticsType.TOTAL_TIME))
}
