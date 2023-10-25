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
    fun allExercises(): List<Exercise> {
        return exerciseRepository.findAllByUserId(AuthenticatedUser.id)
    }

    fun getExercise(id: UUID): Exercise {
        return exerciseRepository.findById(id)
            .filter(AuthenticatedUser::isResourceOwner)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, EXERCISE_NOT_FOUND) }
    }

    fun allExercisesById(ids: Set<UUID>): List<Exercise> {
        return exerciseRepository.findAllById(ids).filter(AuthenticatedUser::isResourceOwner)
    }

    fun saveExercise(exerciseCreateRequest: ExerciseCreateRequest): Exercise {
        return exerciseRepository.save(
            Exercise(
                userId = AuthenticatedUser.id,
                name = exerciseCreateRequest.name,
                exerciseCategory = exerciseCreateRequest.exerciseCategory
            )
        )
    }

    fun updateExercise(exerciseUpdateRequest: ExerciseUpdateRequest, id: UUID): Exercise {
        val exercise: Exercise = getExercise(id)
        exercise.name = exerciseUpdateRequest.name
        return exerciseRepository.save(exercise)
    }

    fun deleteExercise(id: UUID) {
        exerciseRepository.delete(getExercise(id))
    }

    companion object {
        private const val EXERCISE_NOT_FOUND = "Exercise not found"
    }
}
