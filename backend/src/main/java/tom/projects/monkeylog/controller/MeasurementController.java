package tom.projects.monkeylog.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tom.projects.monkeylog.dto.measurement.*;
import tom.projects.monkeylog.mapper.MeasurementMapper;
import tom.projects.monkeylog.service.MeasurementService;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Tag(name = "Measurement")
public class MeasurementController {
    private final MeasurementService measurementService;
    private final MeasurementMapper measurementMapper;

    @GetMapping("/measurements")
    List<MeasurementFullResponse> getMeasurements() {
        return measurementMapper.measurementsToMeasurementFullResponses(measurementService.all());
    }

    @PostMapping("/measurements")
    MeasurementResponse createMeasurement(@RequestBody @Valid MeasurementCreateRequest measurementCreateRequest) {
        return measurementMapper.measurementToMeasurementResponse(measurementService.create(measurementCreateRequest));
    }

    @PatchMapping("/measurements/{id}")
    MeasurementResponse updateMeasurement(@RequestBody @Valid MeasurementUpdateRequest measurementUpdateRequest, @PathVariable UUID id) {
        return measurementMapper.measurementToMeasurementResponse(measurementService.update(measurementUpdateRequest, id));
    }

    @DeleteMapping("/measurements/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteMeasurement(@PathVariable UUID id) {
        measurementService.delete(id);
    }

    @PostMapping("/measurements/{id}/measurement-points")
    MeasurementPointResponse createMeasurementPoint(@RequestBody @Valid MeasurementPointCreateRequest measurementPointCreateRequest, @PathVariable UUID id) {
        return measurementMapper.measurementPointToMeasurementPointResponse(measurementService.createPoint(id, measurementPointCreateRequest));
    }

    @PatchMapping("/measurement-points/{id}")
    MeasurementPointResponse updateMeasurementPoint(@RequestBody @Valid MeasurementPointUpdateRequest measurementPointUpdateRequest, @PathVariable UUID id) {
        return measurementMapper.measurementPointToMeasurementPointResponse(measurementService.updatePoint(id, measurementPointUpdateRequest));
    }

    @DeleteMapping("/measurement-points/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteMeasurementPoint(@PathVariable UUID id) {
        measurementService.deletePoint(id);
    }
}