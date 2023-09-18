package tom.com.monkeylog.model.exercise

enum class ExerciseCategory(val niceName: String, val types: List<ExerciseType>) {
    REPS("Reps", listOf(ExerciseType.REPS)),
    WEIGHTED("Weighted", listOf(ExerciseType.REPS, ExerciseType.WEIGHT)),
    DURATION("Duration", listOf(ExerciseType.TIME)),
    DISTANCE("Distance", listOf(ExerciseType.DISTANCE, ExerciseType.TIME))
}
