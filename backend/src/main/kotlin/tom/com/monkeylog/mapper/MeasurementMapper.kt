package tom.com.monkeylog.mapper

import tom.com.monkeylog.dto.measurement.*
import tom.com.monkeylog.model.measurement.Measurement
import tom.com.monkeylog.model.measurement.MeasurementPoint


fun Measurement.toFullResponse() = MeasurementFullResponse(
    measurement = toResponse(),
    points = measurementPoints.map(MeasurementPoint::toResponse)
)

fun Measurement.toResponse() = MeasurementResponse(
    id = id!!,
    name = name,
    metric = metric
)

fun MeasurementPoint.toResponse() = MeasurementPointResponse(
    id = id!!,
    value = value,
    createdAt = createdAt!!
)

fun MeasurementCreateRequest.toEntity() = Measurement(
    name = name,
    metric = metric
)

fun Measurement.update(measurementUpdateRequest: MeasurementUpdateRequest): Measurement {
    name = measurementUpdateRequest.name
    metric = measurementUpdateRequest.metric

    return this
}
