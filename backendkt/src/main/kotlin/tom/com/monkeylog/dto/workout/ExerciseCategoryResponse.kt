package tom.com.monkeylog.dto.workout

import tom.com.monkeylog.model.exercise.ExerciseCategory

data class ExerciseCategoryResponse(
    val id: ExerciseCategory,
    val name: String,
    val exerciseTypes: List<ExerciseTypeResponse>,
)
