package tom.com.monkeylog.mapper

import org.mapstruct.Mapper
import org.mapstruct.MappingTarget
import org.mapstruct.ReportingPolicy
import tom.com.monkeylog.dto.measurement.*
import tom.com.monkeylog.model.measurement.Measurement
import tom.com.monkeylog.model.measurement.MeasurementPoint

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface MeasurementMapper {
    fun measurementToMeasurementFullResponse(measurement: Measurement): MeasurementFullResponse
    fun measurementsToMeasurementFullResponses(measurementList: List<Measurement>): List<MeasurementFullResponse>
    fun measurementToMeasurementResponse(measurement: Measurement): MeasurementResponse
    fun measurementPointToMeasurementPointResponse(measurementPoint: MeasurementPoint): MeasurementPointResponse
    fun measurementCreateRequestToMeasurement(measurementCreateRequest: MeasurementCreateRequest): Measurement
    fun updateMeasurement(@MappingTarget measurement: Measurement, measurementUpdateRequest: MeasurementUpdateRequest)
}
