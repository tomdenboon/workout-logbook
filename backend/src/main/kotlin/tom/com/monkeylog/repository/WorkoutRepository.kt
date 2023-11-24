package tom.com.monkeylog.repository

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import tom.com.monkeylog.model.workout.Workout
import tom.com.monkeylog.model.workout.WorkoutType
import java.util.*

interface WorkoutRepository : JpaRepository<Workout, UUID> {
    @EntityGraph(attributePaths = ["exerciseGroups.exercise", "exerciseGroups.exerciseRows"])
    override fun findById(id: UUID): Optional<Workout>

    @EntityGraph(attributePaths = ["exerciseGroups.exercise", "exerciseGroups.exerciseRows"])
    fun findAllByWorkoutTypeAndUserId(workoutType: WorkoutType, userId: UUID): List<Workout>

    @Query(
        """
            SELECT w.id
            FROM Workout w
            WHERE w.workoutType = :workoutType
              AND w.userId = :userId
        """
    )
    fun findAllIdsByWorkoutTypeAndUserId(workoutType: WorkoutType, userId: UUID, pageable: Pageable): Page<UUID>

    @EntityGraph(attributePaths = ["exerciseGroups.exercise", "exerciseGroups.exerciseRows"])
    fun findAllByIdIn(ids: List<UUID>): List<Workout>
}
