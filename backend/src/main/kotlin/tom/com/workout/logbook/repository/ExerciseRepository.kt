package tom.com.workout.logbook.repository

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.workout.logbook.model.exercise.Exercise
import java.util.*

interface ExerciseRepository : JpaRepository<Exercise, UUID> {
    fun findAllByUserId(userId: UUID): List<Exercise>
}
