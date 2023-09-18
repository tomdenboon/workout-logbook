package tom.com.monkeylog.service

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.monkeylog.dto.measurement.MeasurementCreateRequest
import tom.com.monkeylog.dto.measurement.MeasurementPointCreateRequest
import tom.com.monkeylog.dto.measurement.MeasurementPointUpdateRequest
import tom.com.monkeylog.dto.measurement.MeasurementUpdateRequest
import tom.com.monkeylog.mapper.MeasurementMapper
import tom.com.monkeylog.model.measurement.Measurement
import tom.com.monkeylog.model.measurement.MeasurementPoint
import tom.com.monkeylog.repository.measurement.MeasurementPointRepository
import tom.com.monkeylog.repository.measurement.MeasurementRepository
import tom.com.monkeylog.security.AuthenticatedUser
import java.util.*

@Service
class MeasurementService(
    private val measurementRepository: MeasurementRepository,
    private val measurementPointRepository: MeasurementPointRepository,
    private val measurementMapper: MeasurementMapper,
) {
    fun all(): List<Measurement> {
        return measurementRepository.findAll()
    }

    operator fun get(id: UUID): Measurement {
        return measurementRepository.findById(id)
            .filter(AuthenticatedUser::isResourceOwner)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, MEASUREMENT_NOT_FOUND) }
    }

    fun getPoint(id: UUID): MeasurementPoint {
        return measurementPointRepository.findById(id)
            .filter(AuthenticatedUser::isResourceOwner)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, MEASUREMENT_POINT_NOT_FOUND) }
    }

    fun create(measurementCreateRequest: MeasurementCreateRequest): Measurement {
        val measurement: Measurement = measurementMapper.measurementCreateRequestToMeasurement(measurementCreateRequest)
        measurement.userId = AuthenticatedUser.id
        return measurementRepository.save(measurement)
    }

    fun update(measurementPatchDto: MeasurementUpdateRequest, id: UUID): Measurement {
        val measurement: Measurement = get(id)
        measurementMapper.updateMeasurement(measurement, measurementPatchDto)
        return measurementRepository.save(measurement)
    }

    fun createPoint(
        measurementId: UUID,
        measurementPointCreateRequest: MeasurementPointCreateRequest
    ): MeasurementPoint {
        val measurementPoint = MeasurementPoint(
            value = measurementPointCreateRequest.value,
            measurement = get(measurementId)
        )
        return measurementPointRepository.save(measurementPoint)
    }

    fun updatePoint(id: UUID, measurementPointUpdateRequest: MeasurementPointUpdateRequest): MeasurementPoint {
        val measurementPoint = getPoint(id)
        measurementPoint.value = measurementPointUpdateRequest.value
        return measurementPointRepository.save(measurementPoint)
    }

    fun delete(id: UUID) {
        measurementRepository.delete(get(id))
    }

    fun deletePoint(id: UUID) {
        measurementPointRepository.delete(getPoint(id))
    }

    companion object {
        private const val MEASUREMENT_NOT_FOUND = "Measurement not found."
        private const val MEASUREMENT_POINT_NOT_FOUND = "Measurement point not found."
    }
}
