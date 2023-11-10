package tom.com.monkeylog.service

import tom.com.monkeylog.model.workout.*
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
            this@clone.exerciseRows.map { exerciseRow -> exerciseRow.clone(this) }.toMutableList();
    }
}

fun ExerciseRow.clone(exerciseGroup: ExerciseGroup): ExerciseRow {
    return ExerciseRow(
        lifted = false,
        exerciseGroup = exerciseGroup,
        userId = AuthenticatedUser.id
    ).apply {
        exerciseRowFields = this@clone.exerciseRowFields.map { exerciseRowField -> exerciseRowField.clone(this) }
    }
}

fun ExerciseRowField.clone(exerciseRow: ExerciseRow): ExerciseRowField {
    return ExerciseRowField(
        exerciseRow = exerciseRow,
        value = value,
        exerciseType = exerciseType,
        userId = AuthenticatedUser.id
    )
}