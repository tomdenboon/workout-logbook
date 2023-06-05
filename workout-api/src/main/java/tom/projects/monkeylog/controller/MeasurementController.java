package tom.projects.monkeylog.controller;

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

    @GetMapping("/measurement")
    List<MeasurementFullResponse> all() {
        return measurementMapper.measurementsToMeasurementFullResponses(measurementService.all());
    }

    @PostMapping("/measurement")
    MeasurementResponse create(@RequestBody MeasurementCreateRequest measurementCreateRequest) {
        return measurementMapper.measurementToMeasurementResponse(measurementService.create(measurementCreateRequest));
    }

    @PatchMapping("/measurement/id")
    MeasurementResponse update(@RequestBody MeasurementUpdateRequest measurementUpdateRequest, @PathVariable Long id) {
        return measurementMapper.measurementToMeasurementResponse(measurementService.update(measurementUpdateRequest, id));
    }

    @DeleteMapping("/measurement/{id}")
    void delete(@PathVariable Long id) {
        measurementService.delete(id);
    }

    @PostMapping("/measurement/{id}/measurement_point")
    MeasurementPointResponse createPoint(@RequestBody MeasurementPointCreateRequest measurementPointCreateRequest, @PathVariable Long id) {
        return measurementMapper.measurementPointToMeasurementPointResponse(measurementService.createPoint(id, measurementPointCreateRequest));
    }

    @PatchMapping("/measurement_point/{id}")
    MeasurementPointResponse updateField(@RequestBody MeasurementPointUpdateRequest measurementPointUpdateRequest, @PathVariable Long id) {
        return measurementMapper.measurementPointToMeasurementPointResponse(measurementService.updatePoint(id, measurementPointUpdateRequest));
    }

    @DeleteMapping("/measurement_point/{id}")
    void destroyPoint(@PathVariable Long id) {
        measurementService.deletePoint(id);
    }
}