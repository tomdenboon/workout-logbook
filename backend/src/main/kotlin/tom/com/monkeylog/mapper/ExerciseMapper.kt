package tom.com.monkeylog.mapper

import tom.com.monkeylog.dto.workout.ExerciseResponse
import tom.com.monkeylog.model.exercise.Exercise

fun Exercise.toResponse() = ExerciseResponse(
    id!!,
    name,
    exerciseCategory
)