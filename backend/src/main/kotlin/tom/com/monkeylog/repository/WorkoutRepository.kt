package tom.com.monkeylog.repository

import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import tom.com.monkeylog.model.workout.Workout
import tom.com.monkeylog.model.workout.WorkoutType
import java.util.*

interface WorkoutRepository : JpaRepository<Workout, UUID> {
    @EntityGraph(attributePaths = ["exerciseGroups.exercise", "exerciseGroups.exerciseRows.exerciseRowFields"])
    override fun findById(id: UUID): Optional<Workout>

    @EntityGraph(attributePaths = ["exerciseGroups.exercise", "exerciseGroups.exerciseRows.exerciseRowFields"])
    fun findAllByWorkoutTypeAndUserId(workoutType: WorkoutType, userId: UUID): List<Workout>
}
