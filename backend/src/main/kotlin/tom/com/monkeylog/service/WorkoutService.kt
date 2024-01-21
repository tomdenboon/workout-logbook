package tom.com.monkeylog.service

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.monkeylog.common.dto.IdProjection
import tom.com.monkeylog.dto.workout.WorkoutCreateRequest
import tom.com.monkeylog.mapper.toEntity
import tom.com.monkeylog.model.workout.ExerciseRow
import tom.com.monkeylog.model.workout.Workout
import tom.com.monkeylog.model.workout.WorkoutType
import tom.com.monkeylog.repository.WorkoutRepository
import tom.com.monkeylog.security.AuthenticatedUser
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

    fun getWorkouts(ids: List<UUID>): List<Workout> {
        return workoutRepository.findAllByIdIn(ids)
    }

    fun getWorkout(id: UUID): Workout {
        return workoutRepository.findById(id)
            .filter(AuthenticatedUser::isResourceOwner)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND) }
    }

    fun getActiveWorkouts(): List<Workout> {
        return workoutRepository.findAllByWorkoutTypeAndUserId(
            WorkoutType.ACTIVE,
            AuthenticatedUser.id
        );
    }

    fun startWorkout(): Workout {
        return Workout(name = "New empty workout").run(this::startWorkout)
    }

    fun startWorkout(id: UUID): Workout {
        return getWorkout(id).clone().run(this::startWorkout)
    }

    private fun startWorkout(workout: Workout): Workout {
        workoutRepository.deleteAll(getActiveWorkouts())

        return workout.apply {
            startDate = Instant.now()
            workoutType = WorkoutType.ACTIVE
            userId = AuthenticatedUser.id
        }.let(workoutRepository::save)
    }

    fun complete(): Workout {
        val activeWorkout: Workout = getActiveWorkouts().firstOrNull()
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND)

        return activeWorkout.apply {
            endDate = Instant.now()
            workoutType = WorkoutType.COMPLETED
            exerciseGroups.forEach { it.exerciseRows.removeIf(not(ExerciseRow::lifted)) }
            exerciseGroups.removeIf { it.exerciseRows.isEmpty() }
        }.let(workoutRepository::save)
    }

    fun cloneToTemplate(id: UUID) = getWorkout(id).clone().let(workoutRepository::save)

    fun save(workoutRequest: WorkoutCreateRequest): Workout {
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