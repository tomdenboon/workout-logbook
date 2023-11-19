package tom.com.monkeylog.repository

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.monkeylog.model.workout.ExerciseRow
import java.util.*

interface ExerciseRowRepository : JpaRepository<ExerciseRow, UUID> {
}
