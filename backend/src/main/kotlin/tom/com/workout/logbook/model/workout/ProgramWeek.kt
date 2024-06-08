package tom.com.workout.logbook.model.workout

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.workout.logbook.model.user.UserOwned
import tom.com.workout.logbook.service.clone
import java.util.*

@Entity
class ProgramWeek(
    @Id
    @GeneratedValue
    @UuidGenerator
    var id: UUID? = null,
    @Column(nullable = false)
    var name: String,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id", nullable = false)
    var program: Program,
    @OneToMany(mappedBy = "programWeek")
    var workouts: MutableList<tom.com.workout.logbook.model.workout.Workout> = ArrayList(),
    override var userId: UUID? = null
) : UserOwned {
    fun clone(program: Program): ProgramWeek {
        return ProgramWeek(
            name = name,
            program = program,
            workouts = workouts.map { it.clone() }.toMutableList(),
            userId = userId
        )
    }
}
