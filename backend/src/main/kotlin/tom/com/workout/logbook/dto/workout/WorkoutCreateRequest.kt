package tom.com.workout.logbook.dto.workout

import java.util.*

data class WorkoutCreateRequest(
    val name: String,
    val programWeekId: UUID?,
)
