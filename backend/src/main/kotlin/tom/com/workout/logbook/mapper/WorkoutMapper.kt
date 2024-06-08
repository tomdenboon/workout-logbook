package tom.com.workout.logbook.mapper

import tom.com.workout.logbook.dto.workout.*
import tom.com.workout.logbook.model.workout.ExerciseGroup
import tom.com.workout.logbook.model.workout.ExerciseRow
import tom.com.workout.logbook.model.workout.Workout


fun WorkoutCreateRequest.toEntity() = tom.com.workout.logbook.model.workout.Workout(
    name = name,
)

fun tom.com.workout.logbook.model.workout.Workout.toResponse() = WorkoutResponse(
    id = id!!,
    name = name,
    note = note,
    workoutType = workoutType,
    startDate = startDate,
    endDate = endDate,
)

fun tom.com.workout.logbook.model.workout.Workout.toFullResponse() = WorkoutFullResponse(
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

fun ExerciseRow.toResponse() = tom.com.workout.logbook.dto.workout.ExerciseRowResponse(
    id = id!!,
    lifted = lifted,
    time = time,
    reps = reps,
    distance = distance,
    weight = weight,
    rpe = rpe
)