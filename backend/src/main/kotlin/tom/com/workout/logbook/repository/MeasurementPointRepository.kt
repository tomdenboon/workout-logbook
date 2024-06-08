package tom.com.workout.logbook.repository

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.workout.logbook.model.measurement.MeasurementPoint
import java.util.*

interface MeasurementPointRepository : JpaRepository<MeasurementPoint, UUID>
