package tom.com.monkeylog.mapper

import tom.com.monkeylog.common.notNull
import tom.com.monkeylog.dto.workout.ExerciseCategoryResponse
import tom.com.monkeylog.dto.workout.ExerciseResponse
import tom.com.monkeylog.dto.workout.ExerciseTypeResponse
import tom.com.monkeylog.model.exercise.Exercise
import tom.com.monkeylog.model.exercise.ExerciseCategory
import tom.com.monkeylog.model.exercise.ExerciseType

fun Exercise.toResponse() = ExerciseResponse(
    id.notNull(),
    name,
    exerciseCategory.toResponse(),
)

fun ExerciseType.toResponse() = ExerciseTypeResponse(
    this,
    niceName,
    metricFormat
)

fun ExerciseCategory.toResponse(): ExerciseCategoryResponse {
    return ExerciseCategoryResponse(
        this,
        niceName,
        types.map { it.toResponse() }.toList()
    )
}
