package tom.com.monkeylog.repository

import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import tom.com.monkeylog.model.workout.ExerciseGroup
import tom.com.monkeylog.model.workout.WorkoutType
import java.util.*

interface ExerciseGroupRepository : JpaRepository<ExerciseGroup, UUID> {
    @EntityGraph(attributePaths = ["workout", "exerciseRows"])
    fun findAllByExerciseIdAndUserIdAndWorkoutWorkoutType(
        exerciseId: UUID,
        userId: UUID,
        workoutType: WorkoutType,
    ): List<ExerciseGroup>
}
