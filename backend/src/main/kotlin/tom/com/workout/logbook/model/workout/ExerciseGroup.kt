package tom.com.workout.logbook.model.workout

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.workout.logbook.model.exercise.Exercise
import tom.com.workout.logbook.model.user.UserOwned
import java.util.*

@Entity
@Table(
    indexes = [
        Index(name = "idx_exercise_group_exercise_id", columnList = "exercise_id"),
        Index(name = "idx_exercise_group_workout_id", columnList = "workout_id")
    ]
)
class ExerciseGroup(
    @Id
    @GeneratedValue
    @UuidGenerator
    var id: UUID? = null,
    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    var exercise: Exercise,
    @ManyToOne
    @JoinColumn(name = "workout_id", nullable = false)
    var workout: tom.com.workout.logbook.model.workout.Workout,
    @OneToMany(mappedBy = "exerciseGroup", cascade = [CascadeType.ALL], orphanRemoval = true)
    @OrderColumn(name = "sort_order")
    var exerciseRows: MutableList<ExerciseRow> = ArrayList(),
    override var userId: UUID? = null
) : UserOwned