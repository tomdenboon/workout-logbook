package tom.com.monkeylog.model.workout

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.monkeylog.model.user.UserOwned
import java.util.*

@Entity
@Table(indexes = [Index(name = "idx_exercise_row_exercise_group_id", columnList = "exercise_group_id")])
class ExerciseRow(
    @Id
    @GeneratedValue
    @UuidGenerator
    var id: UUID? = null,
    @Column(nullable = false)
    var lifted: Boolean,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_group_id", nullable = false)
    var exerciseGroup: ExerciseGroup,
    var reps: Int? = null,
    var weight: Double? = null,
    var time: Int? = null,
    var distance: Double? = null,
    var rpe: Int? = null,
    override var userId: UUID? = null,
) : UserOwned