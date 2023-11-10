package tom.com.monkeylog.repository

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.monkeylog.model.measurement.MeasurementPoint
import java.util.*

interface MeasurementPointRepository : JpaRepository<MeasurementPoint, UUID>
