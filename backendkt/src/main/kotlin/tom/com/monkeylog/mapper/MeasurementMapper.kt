package tom.com.monkeylog.mapper

import tom.com.monkeylog.common.notNull
import tom.com.monkeylog.dto.measurement.*
import tom.com.monkeylog.model.measurement.Measurement
import tom.com.monkeylog.model.measurement.MeasurementPoint


fun Measurement.toFullResponse() = MeasurementFullResponse(
    id = id.notNull(),
    name = name,
    metric = metric,
    points = measurementPoints.map { it.toResponse() }.toList()
)

fun Measurement.toResponse() = MeasurementResponse(
    id = id.notNull(),
    name = name,
    metric = metric
)

fun MeasurementPoint.toResponse() = MeasurementPointResponse(
    id = id.notNull(),
    value = value,
    createdAt = createdAt.notNull()
)

fun MeasurementCreateRequest.toEntity() = Measurement(
    name = name,
    metric = metric
)

fun Measurement.update(measurementUpdateRequest: MeasurementUpdateRequest): Measurement {
    name = measurementUpdateRequest.name
    metric = measurementUpdateRequest.metric

    return this;
}
