package tom.com.workout.logbook.dto.measurement

import tom.com.workout.logbook.model.MetricFormat
import java.util.*

data class MeasurementResponse(
    val id: UUID,
    val name: String,
    val metric: MetricFormat
)