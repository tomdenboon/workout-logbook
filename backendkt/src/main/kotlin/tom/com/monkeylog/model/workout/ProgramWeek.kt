package tom.com.monkeylog.model.workout

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.monkeylog.model.user.UserOwned
import java.util.*

@Entity
class ProgramWeek(
    @Id
    @GeneratedValue
    @UuidGenerator
    var id: UUID? = null,
    @Column(nullable = false)
    var name: String,
    @ManyToOne
    @JoinColumn(name = "program_id", nullable = false)
    var program: Program,
    @OneToMany(mappedBy = "programWeek")
    var workouts: MutableList<Workout> = ArrayList(),
    override var userId: UUID?
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
