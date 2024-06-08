package tom.com.workout.logbook.dto.measurement

import jakarta.validation.constraints.NotBlank
import tom.com.workout.logbook.model.MetricFormat

data class MeasurementUpdateRequest(
    @NotBlank
    val name: String,
    val metric: MetricFormat
)
