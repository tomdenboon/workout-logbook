package tom.com.monkeylog.dto.workout

import tom.com.monkeylog.model.workout.WorkoutType
import java.time.LocalDateTime
import java.util.*

data class WorkoutResponse(
    val id: UUID,
    val name: String,
    val note: String? = null,
    val workoutType: WorkoutType,
    val startDate: LocalDateTime? = null,
    val endDate: LocalDateTime? = null,
)
