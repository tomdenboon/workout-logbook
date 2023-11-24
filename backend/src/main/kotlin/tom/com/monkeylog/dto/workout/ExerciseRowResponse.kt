package tom.com.monkeylog.dto.workout

import java.util.*

data class ExerciseRowResponse(
    val id: UUID,
    val lifted: Boolean,
    val weight: Double?,
    val distance: Double?,
    val time: Int?,
    val reps: Int?,
    val rpe: Int?
)
