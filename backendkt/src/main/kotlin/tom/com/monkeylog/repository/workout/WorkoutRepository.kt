package tom.com.monkeylog.repository.workout

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import tom.com.monkeylog.model.workout.Workout
import tom.com.monkeylog.model.workout.WorkoutType
import java.time.LocalDateTime
import java.util.*

interface WorkoutRepository : JpaRepository<Workout, UUID> {
    fun findAllByWorkoutTypeAndUserId(workoutType: WorkoutType, userId: UUID): List<Workout>
    fun findAllByWorkoutTypeAndUserId(workoutType: WorkoutType, userId: UUID, pageable: Pageable): Page<Workout>
    fun findAllByWorkoutTypeAndUserIdAndStartDateAfter(
        workoutType: WorkoutType,
        userId: UUID,
        start: LocalDateTime,
        pageable: Pageable
    ): Page<Workout>
}
