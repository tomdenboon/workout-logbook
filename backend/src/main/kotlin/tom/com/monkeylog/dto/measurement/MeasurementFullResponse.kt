package tom.com.monkeylog.dto.measurement

import com.fasterxml.jackson.annotation.JsonUnwrapped

data class MeasurementFullResponse(
    @JsonUnwrapped
    val measurement: MeasurementResponse,
    val points: List<MeasurementPointResponse>
)