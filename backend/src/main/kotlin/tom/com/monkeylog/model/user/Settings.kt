package tom.com.monkeylog.model.user

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import org.hibernate.annotations.UuidGenerator
import java.util.*

@Entity
class Settings(
    @Id
    @GeneratedValue
    @UuidGenerator
    var id: UUID? = null,
    var measurementSystem: MeasurementSystem,
    override var userId: UUID? = null,
) : UserOwned
