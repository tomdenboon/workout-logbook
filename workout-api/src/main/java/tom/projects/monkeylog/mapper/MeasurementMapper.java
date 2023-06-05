package tom.projects.monkeylog.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import tom.projects.monkeylog.dto.measurement.*;
import tom.projects.monkeylog.model.measurement.Measurement;
import tom.projects.monkeylog.model.measurement.MeasurementPoint;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MeasurementMapper {
    MeasurementFullResponse measurementToMeasurementFullResponse(Measurement measurement);

    List<MeasurementFullResponse> measurementsToMeasurementFullResponses(List<Measurement> measurementList);

    MeasurementResponse measurementToMeasurementResponse(Measurement measurement);

    MeasurementPointResponse measurementPointToMeasurementPointResponse(MeasurementPoint measurementPoint);

    Measurement measurementCreateRequestToMeasurement(MeasurementCreateRequest measurementcreateRequest);

    void updateMeasurement(@MappingTarget Measurement measurement, MeasurementUpdateRequest measurementUpdateRequest);
}
