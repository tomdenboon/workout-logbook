package tom.com.monkeylog.repository

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import tom.com.monkeylog.common.dto.IdProjection
import tom.com.monkeylog.model.workout.ExerciseGroup
import tom.com.monkeylog.model.workout.WorkoutType
import java.util.*

interface ExerciseGroupRepository : JpaRepository<ExerciseGroup, UUID> {
    fun findAllByExerciseIdAndUserIdAndWorkoutWorkoutType(
        exerciseId: UUID,
        userId: UUID,
        workoutType: WorkoutType,
        pageable: Pageable,
    ): Page<IdProjection>

    @EntityGraph(attributePaths = ["workout", "exerciseRows", "exercise"])
    fun findAllByIdIn(ids: List<UUID>): List<ExerciseGroup>
}
