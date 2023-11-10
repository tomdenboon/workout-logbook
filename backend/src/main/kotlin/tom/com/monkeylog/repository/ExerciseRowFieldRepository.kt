package tom.com.monkeylog.repository

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.monkeylog.model.workout.ExerciseRowField
import java.util.*

interface ExerciseRowFieldRepository : JpaRepository<ExerciseRowField, UUID>
