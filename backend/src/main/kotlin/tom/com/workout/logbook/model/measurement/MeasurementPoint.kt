package tom.com.workout.logbook.model.measurement

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.workout.logbook.model.user.UserOwned
import java.time.Instant
import java.util.*

@Entity
class MeasurementPoint(
    @Id
    @GeneratedValue
    @UuidGenerator
    var id: UUID? = null,
    var value: Double,
    @ManyToOne
    @JoinColumn(name = "measurement_id", nullable = false)
    var measurement: Measurement,
    var createdAt: Instant? = null,
    override var userId: UUID? = null
) : UserOwned