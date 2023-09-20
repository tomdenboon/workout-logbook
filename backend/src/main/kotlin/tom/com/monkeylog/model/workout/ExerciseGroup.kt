package tom.com.monkeylog.model.workout

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.monkeylog.model.exercise.Exercise
import tom.com.monkeylog.model.user.UserOwned
import java.util.*

@Entity
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
    var workout: Workout,
    @OneToMany(mappedBy = "exerciseGroup", cascade = [CascadeType.ALL], orphanRemoval = true)
    @OrderColumn(name = "sort_order")
    var exerciseRows: MutableList<ExerciseRow> = ArrayList(),
    override var userId: UUID? = null
) : UserOwned {
    fun clone(workout: Workout): ExerciseGroup {
        return ExerciseGroup(
            exercise = exercise,
            workout = workout,
            exerciseRows = this.exerciseRows.map { it.clone(this) }.toMutableList(),
            userId = userId
        )
    }
}