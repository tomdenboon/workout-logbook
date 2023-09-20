package tom.com.monkeylog.model.exercise

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.monkeylog.model.user.UserOwned
import tom.com.monkeylog.model.workout.ExerciseGroup
import java.util.*

@Entity
class Exercise(
    @Id
    @GeneratedValue
    @UuidGenerator
    var id: UUID? = null,
    override var userId: UUID? = null,
    var name: String,
    @OneToMany(mappedBy = "exercise")
    var exerciseGroups: List<ExerciseGroup> = ArrayList(),
    @Enumerated(EnumType.STRING)
    var exerciseCategory: ExerciseCategory
) : UserOwned
