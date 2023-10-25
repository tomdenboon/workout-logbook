package tom.com.monkeylog.dto.measurement

import jakarta.validation.constraints.NotBlank
import tom.com.monkeylog.model.MetricFormat

data class MeasurementUpdateRequest(
    @NotBlank
    val name: String,
    val metric: MetricFormat
)
