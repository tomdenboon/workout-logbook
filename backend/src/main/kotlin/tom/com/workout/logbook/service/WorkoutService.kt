package tom.com.workout.logbook.service

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.workout.logbook.common.dto.IdProjection
import tom.com.workout.logbook.dto.workout.WorkoutCreateRequest
import tom.com.workout.logbook.mapper.toEntity
import tom.com.workout.logbook.model.workout.ExerciseRow
import tom.com.workout.logbook.model.workout.Workout
import tom.com.workout.logbook.model.workout.WorkoutType
import tom.com.workout.logbook.repository.WorkoutRepository
import tom.com.workout.logbook.security.AuthenticatedUser
import java.time.Instant
import java.util.*
import java.util.function.Predicate.not


@Service
class WorkoutService(
    private val workoutRepository: WorkoutRepository,
    private val programService: ProgramService,
) {
    fun getPagedWorkoutIds(workoutType: WorkoutType, pageable: Pageable): Page<IdProjection> {
        return workoutRepository.findAllByWorkoutTypeAndUserId(
            workoutType,
            AuthenticatedUser.id,
            pageable
        )
    }

    fun getWorkouts(ids: List<UUID>): List<tom.com.workout.logbook.model.workout.Workout> {
        return workoutRepository.findAllByIdIn(ids)
    }

    fun getWorkout(id: UUID): tom.com.workout.logbook.model.workout.Workout {
        return workoutRepository.findById(id)
            .filter(AuthenticatedUser::isResourceOwner)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND) }
    }

    fun getActiveWorkouts(): List<tom.com.workout.logbook.model.workout.Workout> {
        return workoutRepository.findAllByWorkoutTypeAndUserId(
            WorkoutType.ACTIVE,
            AuthenticatedUser.id
        );
    }

    fun startWorkout(): tom.com.workout.logbook.model.workout.Workout {
        return tom.com.workout.logbook.model.workout.Workout(name = "New empty workout")
            .run(this::startWorkout)
    }

    fun startWorkout(id: UUID): tom.com.workout.logbook.model.workout.Workout {
        return getWorkout(id).clone().run(this::startWorkout)
    }

    private fun startWorkout(workout: tom.com.workout.logbook.model.workout.Workout): tom.com.workout.logbook.model.workout.Workout {
        workoutRepository.deleteAll(getActiveWorkouts())

        return workout.apply {
            startDate = Instant.now()
            workoutType = WorkoutType.ACTIVE
            userId = AuthenticatedUser.id
        }.let(workoutRepository::save)
    }

    fun complete(): tom.com.workout.logbook.model.workout.Workout {
        val activeWorkout: tom.com.workout.logbook.model.workout.Workout =
            getActiveWorkouts().firstOrNull()
                ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND)

        return activeWorkout.apply {
            endDate = Instant.now()
            workoutType = WorkoutType.COMPLETED
            exerciseGroups.forEach { it.exerciseRows.removeIf(not(ExerciseRow::lifted)) }
            exerciseGroups.removeIf { it.exerciseRows.isEmpty() }
        }.let(workoutRepository::save)
    }

    fun cloneToTemplate(id: UUID) = getWorkout(id).clone().let(workoutRepository::save)

    fun save(workoutRequest: WorkoutCreateRequest): tom.com.workout.logbook.model.workout.Workout {
        return workoutRequest.toEntity().apply {
            workoutType = WorkoutType.TEMPLATE
            userId = AuthenticatedUser.id
            programWeek = workoutRequest.programWeekId?.let(programService::getProgramWeek)
        }.let(workoutRepository::save)
    }

    fun delete(id: UUID) {
        workoutRepository.delete(getWorkout(id))
    }

    companion object {
        const val WORKOUT_NOT_FOUND = "Workout not found."
    }
}