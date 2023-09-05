package tom.projects.monkeylog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tom.projects.monkeylog.dto.measurement.MeasurementCreateRequest;
import tom.projects.monkeylog.dto.measurement.MeasurementPointCreateRequest;
import tom.projects.monkeylog.dto.measurement.MeasurementPointUpdateRequest;
import tom.projects.monkeylog.dto.measurement.MeasurementUpdateRequest;
import tom.projects.monkeylog.mapper.MeasurementMapper;
import tom.projects.monkeylog.model.measurement.Measurement;
import tom.projects.monkeylog.model.measurement.MeasurementPoint;
import tom.projects.monkeylog.repository.measurement.MeasurementPointRepository;
import tom.projects.monkeylog.repository.measurement.MeasurementRepository;
import tom.projects.monkeylog.security.AuthenticatedUser;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class MeasurementService {
    private static final String MEASUREMENT_NOT_FOUND = "Measurement not found.";
    private static final String MEASUREMENT_POINT_NOT_FOUND = "Measurement point not found.";
    private final MeasurementRepository measurementRepository;
    private final MeasurementPointRepository measurementPointRepository;
    private final MeasurementMapper measurementMapper;

    public List<Measurement> all() {
        return measurementRepository.findAll();
    }

    public Measurement get(UUID id) {
        return measurementRepository.findById(id)
                .filter(AuthenticatedUser::isResourceOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, MEASUREMENT_NOT_FOUND));
    }

    public MeasurementPoint getPoint(UUID id) {
        return measurementPointRepository.findById(id)
                .filter(AuthenticatedUser::isResourceOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, MEASUREMENT_POINT_NOT_FOUND));
    }

    public Measurement create(MeasurementCreateRequest measurementCreateRequest) {
        Measurement measurement = measurementMapper.measurementCreateRequestToMeasurement(measurementCreateRequest);
        measurement.setUserId(AuthenticatedUser.getId());

        return measurementRepository.save(measurement);
    }

    public Measurement update(MeasurementUpdateRequest measurementPatchDto, UUID id) {
        Measurement measurement = get(id);
        measurementMapper.updateMeasurement(measurement, measurementPatchDto);

        return measurementRepository.save(measurement);
    }

    public MeasurementPoint createPoint(UUID measurementId, MeasurementPointCreateRequest measurementPointCreateRequest) {
        Measurement measurement = get(measurementId);
        MeasurementPoint measurementPoint = new MeasurementPoint();
        measurementPoint.setValue(measurementPointCreateRequest.getValue());
        measurementPoint.setMeasurement(measurement);

        return measurementPointRepository.save(measurementPoint);
    }

    public MeasurementPoint updatePoint(UUID id, MeasurementPointUpdateRequest measurementPointUpdateRequest) {
        MeasurementPoint measurementPoint = getPoint(id);
        measurementPoint.setValue(measurementPointUpdateRequest.getValue());

        return measurementPointRepository.save(measurementPoint);
    }

    public void delete(UUID id) {
        measurementRepository.delete(get(id));
    }

    public void deletePoint(UUID id) {
        measurementPointRepository.delete(getPoint(id));
    }
}
