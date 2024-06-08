package tom.com.workout.logbook.service

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.workout.logbook.dto.measurement.MeasurementCreateRequest
import tom.com.workout.logbook.dto.measurement.MeasurementPointCreateRequest
import tom.com.workout.logbook.dto.measurement.MeasurementPointUpdateRequest
import tom.com.workout.logbook.dto.measurement.MeasurementUpdateRequest
import tom.com.workout.logbook.mapper.toEntity
import tom.com.workout.logbook.mapper.update
import tom.com.workout.logbook.model.measurement.Measurement
import tom.com.workout.logbook.model.measurement.MeasurementPoint
import tom.com.workout.logbook.repository.MeasurementPointRepository
import tom.com.workout.logbook.repository.MeasurementRepository
import tom.com.workout.logbook.security.AuthenticatedUser
import java.time.Instant
import java.util.*

@Service
class MeasurementService(
    private val measurementRepository: MeasurementRepository,
    private val measurementPointRepository: MeasurementPointRepository,
) {
    fun all() = measurementRepository.findAll()

    fun get(id: UUID): Measurement = measurementRepository.findById(id)
        .filter(AuthenticatedUser::isResourceOwner)
        .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Measurement not found.") }

    fun getPoint(id: UUID): MeasurementPoint = measurementPointRepository.findById(id)
        .filter(AuthenticatedUser::isResourceOwner)
        .orElseThrow {
            ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Measurement point not found."
            )
        }

    fun create(measurementCreateRequest: MeasurementCreateRequest): Measurement {
        return measurementCreateRequest.toEntity().apply {
            userId = AuthenticatedUser.id
        }.let(measurementRepository::save)
    }

    fun update(measurementPatchDto: MeasurementUpdateRequest, id: UUID): Measurement =
        get(id).update(measurementPatchDto).let(measurementRepository::save)

    fun createPoint(
        measurementId: UUID,
        measurementPointCreateRequest: MeasurementPointCreateRequest
    ): MeasurementPoint = MeasurementPoint(
        value = measurementPointCreateRequest.value,
        createdAt = Instant.now(),
        measurement = get(measurementId)
    ).let(measurementPointRepository::save)

    fun updatePoint(
        id: UUID,
        measurementPointUpdateRequest: MeasurementPointUpdateRequest
    ): MeasurementPoint {
        return getPoint(id)
            .apply { value = measurementPointUpdateRequest.value }
            .let(measurementPointRepository::save)
    }

    fun delete(id: UUID) = get(id).let(measurementRepository::delete)

    fun deletePoint(id: UUID) = getPoint(id).let(measurementPointRepository::delete)
}
