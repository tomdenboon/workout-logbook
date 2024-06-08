package tom.com.workout.logbook.service

import tom.com.workout.logbook.model.workout.ExerciseGroup
import tom.com.workout.logbook.model.workout.ExerciseRow
import tom.com.workout.logbook.model.workout.Workout
import tom.com.workout.logbook.model.workout.WorkoutType
import tom.com.workout.logbook.security.AuthenticatedUser


fun tom.com.workout.logbook.model.workout.Workout.clone(): tom.com.workout.logbook.model.workout.Workout {
    return tom.com.workout.logbook.model.workout.Workout(
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

fun ExerciseGroup.clone(workout: tom.com.workout.logbook.model.workout.Workout): ExerciseGroup {
    return ExerciseGroup(
        exercise = exercise,
        workout = workout,
        userId = AuthenticatedUser.id
    ).apply {
        exerciseRows =
            this@clone.exerciseRows.map { it.clone(this) }.toMutableList()
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