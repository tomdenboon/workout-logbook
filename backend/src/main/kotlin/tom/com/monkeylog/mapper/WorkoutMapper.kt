package tom.com.monkeylog.mapper

import tom.com.monkeylog.dto.workout.*
import tom.com.monkeylog.model.workout.ExerciseGroup
import tom.com.monkeylog.model.workout.ExerciseRow
import tom.com.monkeylog.model.workout.Workout


fun WorkoutCreateRequest.toEntity() = Workout(
    name = name,
)

fun Workout.toResponse() = WorkoutResponse(
    id = id!!,
    name = name,
    note = note,
    workoutType = workoutType,
    startDate = startDate,
    endDate = endDate,
)

fun Workout.toFullResponse() = WorkoutFullResponse(
    workout = toResponse(),
    exerciseGroups = exerciseGroups.map(ExerciseGroup::toResponse)
)

fun ExerciseGroup.toResponse() = ExerciseGroupResponse(
    id = id!!,
    exercise = exercise.toResponse(),
    exerciseRows = exerciseRows.map(ExerciseRow::toResponse)
)

fun ExerciseGroup.toResponseWithWorkout() = ExerciseGroupWithWorkoutResponse(
    exerciseGroup = toResponse(),
    workout = workout.toResponse()
)

fun ExerciseRow.toResponse() = ExerciseRowResponse(
    id = id!!,
    lifted = lifted,
    time = time,
    reps = reps,
    distance = distance,
    weight = weight,
    rpe = rpe
)