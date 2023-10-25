package tom.com.monkeylog.repository.workout

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import tom.com.monkeylog.model.workout.Workout
import tom.com.monkeylog.model.workout.WorkoutType
import java.time.Instant
import java.util.*

interface WorkoutRepository : JpaRepository<Workout, UUID> {
    @EntityGraph(value = "workout.exerciseGroups.exerciseRows.exerciseRowFields")
    override fun findById(id: UUID): Optional<Workout>

    @EntityGraph(value = "workout.exerciseGroups.exerciseRows.exerciseRowFields")
    fun findAllByWorkoutTypeAndUserId(workoutType: WorkoutType, userId: UUID): List<Workout>

    @EntityGraph(value = "workout.exerciseGroups.exerciseRows.exerciseRowFields")
    fun findAllByWorkoutTypeAndUserId(workoutType: WorkoutType, userId: UUID, pageable: Pageable): Page<Workout>

    @EntityGraph(value = "workout.exerciseGroups.exerciseRows.exerciseRowFields")
    fun findAllByWorkoutTypeAndUserIdAndStartDateAfter(
        workoutType: WorkoutType,
        userId: UUID,
        start: Instant,
        pageable: Pageable
    ): Page<Workout>
}
