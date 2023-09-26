package tom.com.monkeylog.dto.workout

import tom.com.monkeylog.model.exercise.ExerciseCategory

data class ExerciseCreateRequest(
    val name: String,
    val exerciseCategory: ExerciseCategory
)