package tom.com.monkeylog.service

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.monkeylog.dto.workout.ExerciseCreateRequest
import tom.com.monkeylog.dto.workout.ExerciseUpdateRequest
import tom.com.monkeylog.model.exercise.Exercise
import tom.com.monkeylog.repository.workout.ExerciseRepository
import tom.com.monkeylog.security.AuthenticatedUser
import java.util.*

@Service
class ExerciseService(
    private val exerciseRepository: ExerciseRepository
) {
    fun all(): List<Exercise> {
        return exerciseRepository.findAllByUserId(AuthenticatedUser.id)
    }

    operator fun get(id: UUID): Exercise {
        return exerciseRepository.findById(id)
            .filter(AuthenticatedUser::isResourceOwner)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, EXERCISE_NOT_FOUND) }
    }

    fun allById(ids: Set<UUID>): List<Exercise> {
        return exerciseRepository.findAllById(ids).filter(AuthenticatedUser::isResourceOwner)
    }

    fun save(exerciseCreateRequest: ExerciseCreateRequest): Exercise {
        return exerciseRepository.save(
            Exercise(
                userId = AuthenticatedUser.id,
                name = "AS",
                exerciseCategory = exerciseCreateRequest.exerciseCategory
            )
        )
    }

    fun update(exerciseUpdateRequest: ExerciseUpdateRequest, id: UUID): Exercise {
        val exercise: Exercise = get(id)
        exercise.name = (exerciseUpdateRequest.name)
        return exerciseRepository.save(exercise)
    }

    fun delete(id: UUID) {
        exerciseRepository.delete(get(id))
    }

    companion object {
        private const val EXERCISE_NOT_FOUND = "Exercise not found"
    }
}
