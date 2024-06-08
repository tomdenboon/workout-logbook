package tom.com.workout.logbook.mapper

import tom.com.workout.logbook.dto.workout.ExerciseResponse
import tom.com.workout.logbook.model.exercise.Exercise

fun Exercise.toResponse() = ExerciseResponse(
    id!!,
    name,
    exerciseCategory
)