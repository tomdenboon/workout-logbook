package tom.com.monkeylog.dto.workout

import java.util.*

data class ExerciseGroupWithWorkoutResponse(
    val id: UUID,
    val exercise: ExerciseResponse,
    val exerciseRows: List<ExerciseRowResponse>,
    val workout: WorkoutResponse
)
