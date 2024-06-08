package tom.com.workout.logbook.repository

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import tom.com.workout.logbook.common.dto.IdProjection
import tom.com.workout.logbook.model.workout.ExerciseGroup
import tom.com.workout.logbook.model.workout.WorkoutType
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
