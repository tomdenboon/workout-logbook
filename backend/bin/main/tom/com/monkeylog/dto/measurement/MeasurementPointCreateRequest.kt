package tom.com.monkeylog.dto.measurement

import com.fasterxml.jackson.annotation.JsonProperty

data class MeasurementPointCreateRequest(
    @JsonProperty("value")
    val value: Double
)
