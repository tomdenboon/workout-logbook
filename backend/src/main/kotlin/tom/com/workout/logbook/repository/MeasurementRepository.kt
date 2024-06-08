package tom.com.workout.logbook.repository

import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import tom.com.workout.logbook.model.measurement.Measurement
import java.util.*

interface MeasurementRepository : JpaRepository<Measurement, UUID> {
    @EntityGraph(attributePaths = ["measurementPoints"])
    override fun findById(id: UUID): Optional<Measurement>

    @EntityGraph(attributePaths = ["measurementPoints"])
    override fun findAll(): List<Measurement>
}
