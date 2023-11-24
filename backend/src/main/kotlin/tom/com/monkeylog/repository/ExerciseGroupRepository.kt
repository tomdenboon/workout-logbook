package tom.com.monkeylog.repository

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import tom.com.monkeylog.model.workout.ExerciseGroup
import tom.com.monkeylog.model.workout.WorkoutType
import java.util.*

interface ExerciseGroupRepository : JpaRepository<ExerciseGroup, UUID> {
    @Query(
        """
            SELECT g.id
            FROM ExerciseGroup g
            WHERE g.exercise.id = :exerciseId
              AND g.userId = :userId
              AND g.workout.workoutType = :workoutType
        """
    )
    fun findAllByExerciseIdAndUserIdAndWorkoutWorkoutType(
        exerciseId: UUID,
        userId: UUID,
        workoutType: WorkoutType,
        pageable: Pageable,
    ): Page<UUID>

    @EntityGraph(attributePaths = ["workout", "exerciseRows", "exercise"])
    fun findAllByIdIn(ids: List<UUID>): List<ExerciseGroup>
}
