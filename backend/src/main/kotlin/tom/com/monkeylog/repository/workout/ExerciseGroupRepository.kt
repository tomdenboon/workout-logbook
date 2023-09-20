package tom.com.monkeylog.repository.workout

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.monkeylog.model.workout.ExerciseGroup
import java.util.*

interface ExerciseGroupRepository : JpaRepository<ExerciseGroup, UUID>
