package tom.com.workout.logbook.service

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.workout.logbook.common.dto.IdProjection
import tom.com.workout.logbook.dto.workout.ExerciseGroupCreateRequest
import tom.com.workout.logbook.model.workout.ExerciseGroup
import tom.com.workout.logbook.model.workout.ExerciseRow
import tom.com.workout.logbook.model.workout.Workout
import tom.com.workout.logbook.model.workout.WorkoutType
import tom.com.workout.logbook.repository.ExerciseGroupRepository
import tom.com.workout.logbook.repository.WorkoutRepository
import tom.com.workout.logbook.security.AuthenticatedUser
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
        return get(id).run {
            val exerciseRow: ExerciseRow = exerciseRows.last().clone(this)
            exerciseRow.lifted = workout.workoutType === WorkoutType.COMPLETED
            exerciseRows.add(exerciseRow)

            exerciseGroupRepository.save(this)
        }
    }

    fun save(exerciseGroupCreateRequest: ExerciseGroupCreateRequest, workoutId: UUID) {
        val workout: tom.com.workout.logbook.model.workout.Workout =
            workoutService.getWorkout(workoutId)

        exerciseService.allExercisesById(exerciseGroupCreateRequest.exerciseIds)
            .map { exercise ->
                ExerciseGroup(
                    userId = AuthenticatedUser.id,
                    exercise = exercise,
                    workout = workout
                ).apply {
                    exerciseRows.add(
                        ExerciseRow(
                            exerciseGroup = this,
                            userId = AuthenticatedUser.id,
                            lifted = workout.workoutType === WorkoutType.COMPLETED,
                        )
                    )
                }
            }.forEach(workout.exerciseGroups::add)

        workoutRepository.save(workout)
    }

    fun delete(id: UUID) {
        get(id).run {
            workout.exerciseGroups.remove(this);
            workoutRepository.save(workout)
        }
    }

    fun getExerciseGroupsByExerciseId(exerciseId: UUID, pageable: Pageable): Page<IdProjection> {
        return exerciseGroupRepository.findAllByExerciseIdAndUserIdAndWorkoutWorkoutType(
            exerciseId,
            AuthenticatedUser.id,
            WorkoutType.COMPLETED,
            pageable
        )
    }

    fun getExerciseGroups(ids: List<UUID>): List<ExerciseGroup> {
        return exerciseGroupRepository.findAllByIdIn(ids)
    }
}
