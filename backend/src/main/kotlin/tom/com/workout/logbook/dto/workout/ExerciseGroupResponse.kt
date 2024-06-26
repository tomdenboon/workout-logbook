package tom.com.workout.logbook.dto.workout

import java.util.*

data class ExerciseGroupResponse(
    val id: UUID,
    val exercise: ExerciseResponse,
    val exerciseRows: List<tom.com.workout.logbook.dto.workout.ExerciseRowResponse>,
)
