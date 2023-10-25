package tom.com.monkeylog.model.workout

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.monkeylog.model.exercise.ExerciseType
import tom.com.monkeylog.model.user.UserOwned
import java.util.*

@Entity
class ExerciseRowField(
    @Id
    @GeneratedValue
    @UuidGenerator
    var id: UUID? = null,
    @Enumerated(EnumType.STRING)
    var exerciseType: ExerciseType,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_row_id", nullable = false)
    var exerciseRow: ExerciseRow,
    var value: Double? = null,
    override var userId: UUID? = null,
) : UserOwned