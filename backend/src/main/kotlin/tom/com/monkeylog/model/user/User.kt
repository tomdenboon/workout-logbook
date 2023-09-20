package tom.com.monkeylog.model.user

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import org.hibernate.annotations.UuidGenerator
import java.util.*

@Entity(name = "users")
class User (
    @Id
    @GeneratedValue
    @UuidGenerator
    val id: UUID,
    val name: String
)
