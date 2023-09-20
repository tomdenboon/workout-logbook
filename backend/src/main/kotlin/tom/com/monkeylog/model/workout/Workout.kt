package tom.com.monkeylog.model.workout

import jakarta.persistence.*
import org.hibernate.annotations.UuidGenerator
import tom.com.monkeylog.model.user.UserOwned
import java.time.LocalDateTime
import java.util.*

@Entity
@NamedEntityGraph(
    name = "workout.exerciseGroups.exerciseRows.exerciseRowFields",
    attributeNodes = [NamedAttributeNode(value = "exerciseGroups", subgraph = "subgraph.rows")],
    subgraphs = [
        NamedSubgraph(
            name = "subgraph.rows",
            attributeNodes = [NamedAttributeNode(value = "exerciseRows", subgraph = "subgraph.fields")]
        ),
        NamedSubgraph(
            name = "subgraph.fields",
            attributeNodes = [NamedAttributeNode(value = "exerciseRowFields")]
        )
    ]
)
class Workout(
    @Id
    @GeneratedValue
    @UuidGenerator
    var id: UUID? = null,
    var clonedFromId: UUID? = null,
    var name: String,
    var note: String? = null,
    override var userId: UUID? = null,
    @Enumerated(EnumType.STRING)
    var workoutType: WorkoutType = WorkoutType.TEMPLATE,
    var startDate: LocalDateTime? = null,
    var endDate: LocalDateTime? = null,
    @OneToMany(
        mappedBy = "workout",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    @OrderColumn(name = "sort_order")
    var exerciseGroups: MutableList<ExerciseGroup> = ArrayList(),
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_week_id")
    var programWeek: ProgramWeek? = null
) : UserOwned {
    fun clone(): Workout {
        return Workout(
            name = name,
            note = note,
            userId = userId,
            workoutType = workoutType,
            startDate = startDate,
            endDate = endDate,
            programWeek = programWeek,
            exerciseGroups = exerciseGroups.map { it.clone(this) }.toMutableList()
        )
    }
}