package tom.com.monkeylog.dto.workout

import tom.com.monkeylog.model.workout.WorkoutType
import java.time.Instant
import java.util.*

data class WorkoutResponse(
    val id: UUID,
    val name: String,
    val note: String? = null,
    val workoutType: WorkoutType,
    val startDate: Instant? = null,
    val endDate: Instant? = null,
)
