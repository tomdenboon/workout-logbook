package tom.com.monkeylog.model.workout

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.monkeylog.model.user.UserOwned
import java.util.*

@Entity
class WorkoutFolder(
    @Id
    @GeneratedValue
    @UuidGenerator
    var id: UUID? = null,
    @Column(nullable = false)
    var name: String,
    @OneToMany(mappedBy = "workoutFolder")
    var workouts: MutableList<Workout> = ArrayList(),
    override var userId: UUID?
) : UserOwned
