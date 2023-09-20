package tom.com.monkeylog.dto.workout

import java.util.*

data class ExerciseRowResponse(
    val id: UUID,
    val exerciseRowFields: List<ExerciseRowFieldResponse>,
    val isLifted: Boolean,
)
