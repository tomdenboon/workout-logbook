package tom.com.monkeylog.dto.workout

import tom.com.monkeylog.dto.statistics.StatisticsType
import tom.com.monkeylog.model.exercise.ExerciseCategory

data class ExerciseCategoryResponse(
    val statistics: List<StatisticsType>,
    val validFields: ExerciseCategory.ValidFields
)
