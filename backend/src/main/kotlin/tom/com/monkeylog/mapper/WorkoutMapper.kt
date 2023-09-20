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
    exerciseGroups = exerciseGroups.map { it.toResponse() }.toList()
)

fun ExerciseGroup.toResponse() = ExerciseGroupResponse(
    id = id.notNull(),
    exercise = exercise.toResponse(),
    exerciseRows = exerciseRows.map { it.toResponse() }
)

fun ExerciseRow.toResponse() = ExerciseRowResponse(
    id = id.notNull(),
    isLifted = isLifted,
    exerciseRowFields = exerciseRowFields.map { it.toResponse() },
)

fun ExerciseRowField.toResponse() = ExerciseRowFieldResponse(
    id = id.notNull(),
    value = value,
    exerciseType = exerciseType
)