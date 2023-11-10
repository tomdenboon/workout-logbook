package tom.com.monkeylog.mapper

import tom.com.monkeylog.common.notNull
import tom.com.monkeylog.dto.workout.*
import tom.com.monkeylog.model.workout.ExerciseGroup
import tom.com.monkeylog.model.workout.ExerciseRow
import tom.com.monkeylog.model.workout.ExerciseRowField
import tom.com.monkeylog.model.workout.Workout


fun WorkoutCreateRequest.toEntity() = Workout(
    name = name,
)

fun Workout.toResponse() = WorkoutResponse(
    id = id.notNull(),
    name = name,
    note = note,
    workoutType = workoutType,
    startDate = startDate,
    endDate = endDate,
)

fun Workout.toFullResponse() = WorkoutFullResponse(
    workout = toResponse(),
    exerciseGroups = exerciseGroups.map(ExerciseGroup::toResponse).toList()
)

fun ExerciseGroup.toResponse() = ExerciseGroupResponse(
    id = id.notNull(),
    exercise = exercise.toResponse(),
    exerciseRows = exerciseRows.map(ExerciseRow::toResponse).toList()
)

fun ExerciseGroup.toResponseWithWorkout() = ExerciseGroupWithWorkoutResponse(
    id = id.notNull(),
    exercise = exercise.toResponse(),
    exerciseRows = exerciseRows.map(ExerciseRow::toResponse).toList(),
    workout = workout.toResponse()
)

fun ExerciseRow.toResponse() = ExerciseRowResponse(
    id = id.notNull(),
    lifted = lifted,
    exerciseRowFields = exerciseRowFields.map(ExerciseRowField::toResponse).toList()
)

fun ExerciseRowField.toResponse() = ExerciseRowFieldResponse(
    id = id.notNull(),
    value = value,
    exerciseType = exerciseType
)