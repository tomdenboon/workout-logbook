package tom.com.workout.logbook.model.workout

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.workout.logbook.model.user.UserOwned
import java.util.*

@Entity
class Program(
    @Id
    @GeneratedValue
    @UuidGenerator
    var id: UUID? = null,
    override var userId: UUID? = null,
    @Column(nullable = false)
    var name: String,
    @Column(nullable = false)
    var description: String,
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    var workoutType: WorkoutType,
    @OneToMany(mappedBy = "program", cascade = [CascadeType.ALL], orphanRemoval = true)
    var programWeeks: MutableList<ProgramWeek> = ArrayList()
) : UserOwned {
    fun clone(): Program {
        return Program(
            name = name,
            description = description,
            workoutType = workoutType,
            programWeeks = programWeeks.map { it.clone(this) }.toMutableList(),
            userId = userId
        )
    }
}
