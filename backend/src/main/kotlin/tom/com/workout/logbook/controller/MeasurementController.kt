package tom.com.workout.logbook.controller

import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import tom.com.workout.logbook.dto.measurement.*
import tom.com.workout.logbook.mapper.toFullResponse
import tom.com.workout.logbook.mapper.toResponse
import tom.com.workout.logbook.model.measurement.Measurement
import tom.com.workout.logbook.service.MeasurementService
import java.util.*

@RestController
@Tag(name = "Measurement")
class MeasurementController(private val measurementService: MeasurementService) {
    @GetMapping("/measurements")
    fun getMeasurements() = measurementService.all().map(Measurement::toFullResponse)

    @GetMapping("/measurements/{id}")
    fun getMeasurement(@PathVariable id: UUID) = measurementService.get(id).toFullResponse()

    @PostMapping("/measurements")
    fun createMeasurement(@RequestBody measurementCreateRequest: @Valid MeasurementCreateRequest) =
        measurementService.create(measurementCreateRequest).toResponse()

    @PatchMapping("/measurements/{id}")
    fun updateMeasurement(
        @RequestBody measurementUpdateRequest: @Valid MeasurementUpdateRequest,
        @PathVariable id: UUID
    ) = measurementService.update(measurementUpdateRequest, id).toResponse()

    @DeleteMapping("/measurements/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteMeasurement(@PathVariable id: UUID) = measurementService.delete(id)

    @PostMapping("/measurements/{id}/measurement-points")
    fun createMeasurementPoint(
        @RequestBody @Valid measurementPointCreateRequest: MeasurementPointCreateRequest,
        @PathVariable id: UUID
    ) = measurementService.createPoint(id, measurementPointCreateRequest).toResponse()

    @PatchMapping("/measurement-points/{id}")
    fun updateMeasurementPoint(
        @RequestBody @Valid measurementPointUpdateRequest: MeasurementPointUpdateRequest,
        @PathVariable id: UUID
    ) = measurementService.updatePoint(id, measurementPointUpdateRequest).toResponse()


    @DeleteMapping("/measurement-points/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteMeasurementPoint(@PathVariable id: UUID) = measurementService.deletePoint(id)
}