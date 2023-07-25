package tom.projects.monkeylog.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tom.projects.monkeylog.dto.measurement.*;
import tom.projects.monkeylog.mapper.MeasurementMapper;
import tom.projects.monkeylog.service.MeasurementService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MeasurementController {
    private final MeasurementService measurementService;
    private final MeasurementMapper measurementMapper;

    @GetMapping("/measurements")
    List<MeasurementFullResponse> all() {
        return measurementMapper.measurementsToMeasurementFullResponses(measurementService.all());
    }

    @PostMapping("/measurements")
    MeasurementResponse create(@RequestBody @Valid MeasurementCreateRequest measurementCreateRequest) {
        return measurementMapper.measurementToMeasurementResponse(measurementService.create(measurementCreateRequest));
    }

    @PatchMapping("/measurements/id")
    MeasurementResponse update(@RequestBody @Valid MeasurementUpdateRequest measurementUpdateRequest, @PathVariable Long id) {
        return measurementMapper.measurementToMeasurementResponse(measurementService.update(measurementUpdateRequest, id));
    }

    @DeleteMapping("/measurements/{id}")
    void delete(@PathVariable Long id) {
        measurementService.delete(id);
    }

    @PostMapping("/measurements/{id}/measurement-points")
    MeasurementPointResponse createPoint(@RequestBody @Valid MeasurementPointCreateRequest measurementPointCreateRequest, @PathVariable Long id) {
        return measurementMapper.measurementPointToMeasurementPointResponse(measurementService.createPoint(id, measurementPointCreateRequest));
    }

    @PatchMapping("/measurement-points/{id}")
    MeasurementPointResponse updateField(@RequestBody @Valid MeasurementPointUpdateRequest measurementPointUpdateRequest, @PathVariable Long id) {
        return measurementMapper.measurementPointToMeasurementPointResponse(measurementService.updatePoint(id, measurementPointUpdateRequest));
    }

    @DeleteMapping("/measurement-points/{id}")
    void destroyPoint(@PathVariable Long id) {
        measurementService.deletePoint(id);
    }
}