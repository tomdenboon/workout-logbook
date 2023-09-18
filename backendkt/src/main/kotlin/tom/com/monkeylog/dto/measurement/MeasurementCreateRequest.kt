package tom.com.monkeylog.dto.measurement

import tom.com.monkeylog.model.MetricFormat

data class MeasurementCreateRequest(
    val name: String,
    val metric: MetricFormat
)