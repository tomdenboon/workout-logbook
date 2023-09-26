package tom.com.monkeylog.service

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.monkeylog.dto.workout.ExerciseGroupCreateRequest
import tom.com.monkeylog.model.workout.*
import tom.com.monkeylog.repository.workout.ExerciseGroupRepository
import tom.com.monkeylog.repository.workout.WorkoutRepository
import tom.com.monkeylog.security.AuthenticatedUser
import java.util.*

@Service
class ExerciseGroupService(
    private val exerciseGroupRepository: ExerciseGroupRepository,
    private val workoutRepository: WorkoutRepository,
    private val workoutService: WorkoutService,
    private val exerciseService: ExerciseService,
) {
    fun get(id: UUID): ExerciseGroup = exerciseGroupRepository.findById(id)
        .filter(AuthenticatedUser::isResourceOwner)
        .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Exercise group not found") }


    fun addRow(id: UUID): ExerciseGroup {
        val exerciseGroup: ExerciseGroup = get(id)
        val exerciseRow: ExerciseRow = exerciseGroup.exerciseRows.last().clone(exerciseGroup)
        exerciseRow.isLifted = exerciseGroup.workout.workoutType === WorkoutType.COMPLETED
        exerciseGroup.exerciseRows.add(exerciseRow)

        return exerciseGroupRepository.save(exerciseGroup)
    }

    fun save(exerciseGroupCreateRequest: ExerciseGroupCreateRequest, workoutId: UUID) {
        val workout: Workout = workoutService.getWorkout(workoutId)

        exerciseService.allExercisesById(exerciseGroupCreateRequest.exerciseIds)
            .map { exercise ->
                val exerciseGroup = ExerciseGroup(
                    userId = AuthenticatedUser.id,
                    exercise = exercise,
                    workout = workout
                )

                val exerciseRow = ExerciseRow(
                    exerciseGroup = exerciseGroup,
                    userId = AuthenticatedUser.id,
                    isLifted = workout.workoutType === WorkoutType.COMPLETED,
                )

                exerciseRow.exerciseRowFields = exercise.exerciseCategory.types.map { exerciseType ->
                    ExerciseRowField(
                        exerciseType = exerciseType,
                        userId = AuthenticatedUser.id,
                        exerciseRow = exerciseRow,
                        value = 0.0
                    )
                }.toSet()

                exerciseGroup
            }.forEach(workout.exerciseGroups::add)

        workoutRepository.save(workout)
    }

    fun delete(id: UUID) {
        val exerciseGroup: ExerciseGroup = get(id)
        val workout: Workout = exerciseGroup.workout
        workout.exerciseGroups.remove(exerciseGroup)
        workoutRepository.save(workout)
    }
}
