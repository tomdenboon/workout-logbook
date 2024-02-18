package tom.com.monkeylog.model.workout

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.monkeylog.model.user.UserOwned
import java.time.Instant
import java.util.*

@Entity
class Workout(
    @Id
    @GeneratedValue
    @UuidGenerator
    var id: UUID? = null,
    var clonedFromId: UUID? = null,
    @Column(nullable = false)
    var name: String,
    var note: String? = null,
    override var userId: UUID? = null,
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var workoutType: WorkoutType = WorkoutType.TEMPLATE,
    var startDate: Instant? = null,
    var endDate: Instant? = null,
    @OneToMany(mappedBy = "workout", cascade = [CascadeType.ALL], orphanRemoval = true)
    @OrderColumn(name = "sort_order")
    var exerciseGroups: MutableList<ExerciseGroup> = ArrayList(),
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_week_id")
    var programWeek: ProgramWeek? = null
) : UserOwned