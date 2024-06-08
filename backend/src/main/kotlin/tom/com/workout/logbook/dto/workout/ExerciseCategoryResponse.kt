package tom.com.workout.logbook.dto.workout

import tom.com.workout.logbook.dto.statistics.StatisticsType
import tom.com.workout.logbook.model.exercise.ExerciseCategory

data class ExerciseCategoryResponse(
    val statistics: List<StatisticsType>,
    val validFields: ExerciseCategory.ValidFields
)
