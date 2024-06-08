package tom.com.workout.logbook.mapper

import tom.com.workout.logbook.dto.measurement.*
import tom.com.workout.logbook.model.measurement.Measurement
import tom.com.workout.logbook.model.measurement.MeasurementPoint


fun Measurement.toFullResponse() = MeasurementFullResponse(
    measurement = toResponse(),
    points = measurementPoints.map(MeasurementPoint::toResponse)
)

fun Measurement.toResponse() = MeasurementResponse(
    id = id!!,
    name = name,
    metric = metric
)

fun MeasurementPoint.toResponse() =
    tom.com.workout.logbook.dto.measurement.MeasurementPointResponse(
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
