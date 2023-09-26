package tom.com.monkeylog.model.measurement

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UuidGenerator
import tom.com.monkeylog.model.user.UserOwned
import java.time.LocalDateTime
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
    @CreationTimestamp
    var createdAt: LocalDateTime? = null,
    override var userId: UUID? = null
) : UserOwned