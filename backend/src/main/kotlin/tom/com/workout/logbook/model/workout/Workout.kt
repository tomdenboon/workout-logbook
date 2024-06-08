package tom.com.workout.logbook.model.workout

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.workout.logbook.model.user.UserOwned
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
    var workoutType: tom.com.workout.logbook.model.workout.WorkoutType = tom.com.workout.logbook.model.workout.WorkoutType.TEMPLATE,
    var startDate: Instant? = null,
    var endDate: Instant? = null,
    @OneToMany(mappedBy = "workout", cascade = [CascadeType.ALL], orphanRemoval = true)
    @OrderColumn(name = "sort_order")
    var exerciseGroups: MutableList<tom.com.workout.logbook.model.workout.ExerciseGroup> = ArrayList(),
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_week_id")
    var programWeek: tom.com.workout.logbook.model.workout.ProgramWeek? = null,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_folder_id")
    var workoutFolder: tom.com.workout.logbook.model.workout.WorkoutFolder? = null
) : UserOwned