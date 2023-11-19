package tom.com.monkeylog.mapper

import tom.com.monkeylog.common.notNull
import tom.com.monkeylog.dto.workout.ExerciseCategoryResponse
import tom.com.monkeylog.dto.workout.ExerciseResponse
import tom.com.monkeylog.model.exercise.Exercise
import tom.com.monkeylog.model.exercise.ExerciseCategory

fun Exercise.toResponse() = ExerciseResponse(
    id.notNull(),
    name,
    exerciseCategory.toResponse(),
)

fun ExerciseCategory.toResponse(): ExerciseCategoryResponse = ExerciseCategoryResponse(
    this,
    niceName,
    statistics,
)
