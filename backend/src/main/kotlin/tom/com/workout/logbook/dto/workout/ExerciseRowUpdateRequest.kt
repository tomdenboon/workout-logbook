package tom.com.workout.logbook.dto.workout

import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min

data class ExerciseRowUpdateRequest(
    val lifted: Boolean,
    val weight: Double?,
    val distance: Double?,
    val time: Int?,
    val reps: Int?,
    @Min(1)
    @Max(10)
    val rpe: Int?
)