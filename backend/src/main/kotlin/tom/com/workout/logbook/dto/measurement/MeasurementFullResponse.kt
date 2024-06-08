package tom.com.workout.logbook.dto.measurement

import com.fasterxml.jackson.annotation.JsonUnwrapped

data class MeasurementFullResponse(
    @JsonUnwrapped
    val measurement: MeasurementResponse,
    val points: List<tom.com.workout.logbook.dto.measurement.MeasurementPointResponse>
)