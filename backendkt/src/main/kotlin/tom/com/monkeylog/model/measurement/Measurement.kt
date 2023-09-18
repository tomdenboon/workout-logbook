package tom.com.monkeylog.model.measurement

import jakarta.persistence.*
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import org.hibernate.annotations.UuidGenerator
import tom.com.monkeylog.model.MetricFormat
import tom.com.monkeylog.model.user.UserOwned
import java.util.*

@Entity
class Measurement(
    @Id
    @GeneratedValue
    @UuidGenerator
    var id: UUID,
    var name: String,
    override var userId: UUID?,
    @Enumerated(EnumType.STRING)
    var metric: MetricFormat,

    @OneToMany(mappedBy = "measurement")
    @OnDelete(action = OnDeleteAction.CASCADE)
    var measurementPoints: List<MeasurementPoint> = emptyList()
) : UserOwned