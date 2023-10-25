package tom.com.monkeylog.service

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.monkeylog.dto.workout.WorkoutCreateRequest
import tom.com.monkeylog.mapper.toEntity
import tom.com.monkeylog.model.workout.Workout
import tom.com.monkeylog.model.workout.WorkoutType
import tom.com.monkeylog.repository.workout.WorkoutRepository
import tom.com.monkeylog.security.AuthenticatedUser
import java.time.Instant
import java.util.*


@Service
class WorkoutService(
    private val workoutRepository: WorkoutRepository,
    private val programService: ProgramService,
) {

    fun getWorkouts(workoutType: WorkoutType, after: Instant?, pageable: Pageable): Page<Workout> {
        return after?.let {
            workoutRepository.findAllByWorkoutTypeAndUserIdAndStartDateAfter(
                workoutType,
                AuthenticatedUser.id,
                it,
                pageable
            )
        } ?: workoutRepository.findAllByWorkoutTypeAndUserId(
            workoutType,
            AuthenticatedUser.id,
            pageable
        )
    }

    fun getWorkout(id: UUID): Workout {
        return workoutRepository.findById(id)
            .filter(AuthenticatedUser::isResourceOwner)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND) }
    }

    fun activeWorkout(): Workout? {
        return workoutRepository.findAllByWorkoutTypeAndUserId(WorkoutType.ACTIVE, AuthenticatedUser.id).firstOrNull()
    }

    fun startWorkout(): Workout {
        return startWorkout(Workout(name = "New empty workout"))
    }

    fun startWorkout(id: UUID): Workout {
        return startWorkout(getWorkout(id).clone())
    }

    private fun startWorkout(workout: Workout): Workout {
        workout.startDate = Instant.now()
        workout.workoutType = WorkoutType.ACTIVE
        workout.userId = AuthenticatedUser.id
        clearActive()
        return workoutRepository.save(workout)
    }

    private fun clearActive() {
        workoutRepository
            .deleteAll(workoutRepository.findAllByWorkoutTypeAndUserId(WorkoutType.ACTIVE, AuthenticatedUser.id))
    }

    fun complete(): Workout {
        val workout: Workout =
            workoutRepository.findAllByWorkoutTypeAndUserId(WorkoutType.ACTIVE, AuthenticatedUser.id).firstOrNull()
                ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND)

        workout.exerciseGroups.forEach { exerciseGroup -> exerciseGroup.exerciseRows.removeIf { exerciseRow -> !exerciseRow.isLifted } }
        workout.exerciseGroups.filter { exerciseGroup -> exerciseGroup.exerciseRows.isEmpty() }
        workout.endDate = Instant.now()
        workout.workoutType = WorkoutType.COMPLETED
        return workoutRepository.save(workout)
    }

    fun cloneToTemplate(id: UUID): Workout {
        val workout: Workout = getWorkout(id)
        val newWorkout: Workout = workout.clone()
        newWorkout.name = "${workout.name} - copy"
        newWorkout.workoutType = WorkoutType.TEMPLATE
        newWorkout.userId = AuthenticatedUser.id

        return workoutRepository.save(newWorkout)
    }

    fun save(workoutRequest: WorkoutCreateRequest): Workout {
        val workout: Workout = workoutRequest.toEntity();
        workout.workoutType = WorkoutType.TEMPLATE
        workout.userId = AuthenticatedUser.id
        workout.programWeek = workoutRequest.programWeekId?.let { programService.getProgramWeek(it) }

        return workoutRepository.save(workout)
    }

    fun delete(id: UUID) {
        workoutRepository.delete(getWorkout(id))
    }

    companion object {
        const val WORKOUT_NOT_FOUND = "Workout not found."
    }

}