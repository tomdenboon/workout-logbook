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
    var lifted: Boolean,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_group_id", nullable = false)
    var exerciseGroup: ExerciseGroup,
    @OneToMany(mappedBy = "exerciseRow", cascade = [CascadeType.ALL], orphanRemoval = true)
    var exerciseRowFields: List<ExerciseRowField> = ArrayList(),
    override var userId: UUID? = null,
) : UserOwned