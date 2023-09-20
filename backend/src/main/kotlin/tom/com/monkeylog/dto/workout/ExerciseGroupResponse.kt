package tom.com.monkeylog.dto.workout

import java.util.*

data class ExerciseGroupResponse(
    val id: UUID,
    val exercise: ExerciseResponse,
    val exerciseRows: List<ExerciseRowResponse>,
)
