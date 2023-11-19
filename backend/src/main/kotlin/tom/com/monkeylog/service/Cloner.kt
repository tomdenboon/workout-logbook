package tom.com.monkeylog.service

import tom.com.monkeylog.model.workout.ExerciseGroup
import tom.com.monkeylog.model.workout.ExerciseRow
import tom.com.monkeylog.model.workout.Workout
import tom.com.monkeylog.model.workout.WorkoutType
import tom.com.monkeylog.security.AuthenticatedUser


fun Workout.clone(): Workout {
    return Workout(
        name = "$name - copy",
        note = note,
        userId = AuthenticatedUser.id,
        workoutType = WorkoutType.TEMPLATE,
        startDate = startDate,
        programWeek = programWeek,
    ).apply {
        exerciseGroups = this@clone.exerciseGroups.map { it.clone(this) }.toMutableList()
    }
}

fun ExerciseGroup.clone(workout: Workout): ExerciseGroup {
    return ExerciseGroup(
        exercise = exercise,
        workout = workout,
        userId = AuthenticatedUser.id
    ).apply {
        exerciseRows =
            this@clone.exerciseRows.map { exerciseRow -> exerciseRow.clone(this) }.toMutableList()
    }
}

fun ExerciseRow.clone(exerciseGroup: ExerciseGroup): ExerciseRow {
    return ExerciseRow(
        lifted = false,
        exerciseGroup = exerciseGroup,
        userId = AuthenticatedUser.id,
        reps = reps,
        weight = weight,
        time = time,
        distance = distance
    )
}