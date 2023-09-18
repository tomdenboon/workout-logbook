package tom.com.monkeylog.repository.workout

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.monkeylog.model.exercise.Exercise
import java.util.*

interface ExerciseRepository : JpaRepository<Exercise, UUID> {
    fun findAllByUserId(userId: UUID): List<Exercise>
}
