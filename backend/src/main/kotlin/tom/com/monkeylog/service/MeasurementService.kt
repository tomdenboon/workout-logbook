package tom.com.monkeylog.service

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.monkeylog.dto.measurement.MeasurementCreateRequest
import tom.com.monkeylog.dto.measurement.MeasurementPointCreateRequest
import tom.com.monkeylog.dto.measurement.MeasurementPointUpdateRequest
import tom.com.monkeylog.dto.measurement.MeasurementUpdateRequest
import tom.com.monkeylog.mapper.toEntity
import tom.com.monkeylog.mapper.update
import tom.com.monkeylog.model.measurement.Measurement
import tom.com.monkeylog.model.measurement.MeasurementPoint
import tom.com.monkeylog.repository.MeasurementPointRepository
import tom.com.monkeylog.repository.MeasurementRepository
import tom.com.monkeylog.security.AuthenticatedUser
import java.util.*

@Service
class MeasurementService(
    private val measurementRepository: MeasurementRepository,
    private val measurementPointRepository: MeasurementPointRepository,
) {
    fun all() = measurementRepository.findAll()

    fun get(id: UUID): Measurement = measurementRepository.findById(id)
        .filter(AuthenticatedUser::isResourceOwner)
        .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, MEASUREMENT_NOT_FOUND) }

    fun getPoint(id: UUID): MeasurementPoint = measurementPointRepository.findById(id)
        .filter(AuthenticatedUser::isResourceOwner)
        .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, MEASUREMENT_POINT_NOT_FOUND) }

    fun create(measurementCreateRequest: MeasurementCreateRequest): Measurement {
        val measurement: Measurement = measurementCreateRequest.toEntity()
        measurement.userId = AuthenticatedUser.id
        return measurementRepository.save(measurement)
    }

    fun update(measurementPatchDto: MeasurementUpdateRequest, id: UUID): Measurement =
        measurementRepository.save(get(id).update(measurementPatchDto))

    fun createPoint(
        measurementId: UUID,
        measurementPointCreateRequest: MeasurementPointCreateRequest
    ): MeasurementPoint = measurementPointRepository.save(
        MeasurementPoint(
            value = measurementPointCreateRequest.value,
            measurement = get(measurementId)
        )
    )

    fun updatePoint(id: UUID, measurementPointUpdateRequest: MeasurementPointUpdateRequest): MeasurementPoint {
        val measurementPoint = getPoint(id)
        measurementPoint.value = measurementPointUpdateRequest.value
        return measurementPointRepository.save(measurementPoint)
    }

    fun delete(id: UUID) = measurementRepository.delete(get(id))

    fun deletePoint(id: UUID) = measurementPointRepository.delete(getPoint(id))

    companion object {
        private const val MEASUREMENT_NOT_FOUND = "Measurement not found."
        private const val MEASUREMENT_POINT_NOT_FOUND = "Measurement point not found."
    }
}
