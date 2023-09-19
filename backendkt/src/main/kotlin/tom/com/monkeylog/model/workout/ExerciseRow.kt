package tom.com.monkeylog.model.workout

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.monkeylog.model.user.UserOwned
import java.util.*

@Entity
class ExerciseRow(
    @Id
    @GeneratedValue
    @UuidGenerator
    var id: UUID? = null,
    @Column(nullable = false)
    var isLifted: Boolean,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_group_id", nullable = false)
    var exerciseGroup: ExerciseGroup,
    @OneToMany(mappedBy = "exerciseRow", cascade = [CascadeType.ALL], orphanRemoval = true)
    var exerciseRowFields: Set<ExerciseRowField> = HashSet(),
    override var userId: UUID? = null,
) : UserOwned {
    fun clone(exerciseGroup: ExerciseGroup): ExerciseRow {
        return ExerciseRow(
            isLifted = false,
            exerciseGroup = exerciseGroup,
            exerciseRowFields = exerciseRowFields.map { it.clone(this) }.toSet(),
            userId = userId
        )
    }

//        fun first(exerciseGroup: ExerciseGroup, isLifted: Boolean): ExerciseRow {
//            val exerciseRow = ExerciseRow()
//            exerciseRow.setIsLifted(isLifted)
//            exerciseRow.setExerciseGroup(exerciseGroup)
//            exerciseRow.addExerciseRowFields(
//                    exerciseGroup.exercise.exerciseCategory.types.stream().map<ExerciseRowField>(Function<ExerciseType, ExerciseRowField> { exerciseType: ExerciseType? ->
//                        val exerciseRowField = ExerciseRowField()
//                        exerciseRowField.setExerciseType(exerciseType)
//                        exerciseRowField
//                    }))
//            return exerciseRow
//        }
}