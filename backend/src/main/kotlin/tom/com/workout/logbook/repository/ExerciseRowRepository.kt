package tom.com.workout.logbook.repository

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.workout.logbook.model.workout.ExerciseRow
import java.util.*

interface ExerciseRowRepository : JpaRepository<ExerciseRow, UUID> {
}
