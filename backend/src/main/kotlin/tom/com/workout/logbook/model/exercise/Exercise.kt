package tom.com.workout.logbook.model.exercise

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.workout.logbook.model.user.UserOwned
import tom.com.workout.logbook.model.workout.ExerciseGroup
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
