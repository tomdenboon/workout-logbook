package tom.com.workout.logbook.dto.measurement

import java.time.Instant
import java.util.*

data class MeasurementPointResponse(
    val id: UUID,
    val value: Double,
    val createdAt: Instant
)
