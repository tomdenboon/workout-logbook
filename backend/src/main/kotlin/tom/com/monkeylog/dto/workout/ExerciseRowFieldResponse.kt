package tom.com.monkeylog.dto.workout

import tom.com.monkeylog.model.exercise.ExerciseType
import java.util.*

data class ExerciseRowFieldResponse(
    val id: UUID,
    val value: Double,
    val exerciseType: ExerciseType,
)
