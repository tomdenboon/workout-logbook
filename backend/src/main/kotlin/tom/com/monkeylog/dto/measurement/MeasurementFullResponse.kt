package tom.com.monkeylog.dto.measurement

import tom.com.monkeylog.model.MetricFormat
import java.util.*

data class MeasurementFullResponse(
    val id: UUID,
    val name: String,
    val metric: MetricFormat,
    val points: List<MeasurementPointResponse>
)