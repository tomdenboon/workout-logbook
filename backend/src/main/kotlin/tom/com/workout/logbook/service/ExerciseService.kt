package tom.com.workout.logbook.service

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.workout.logbook.dto.workout.ExerciseCreateRequest
import tom.com.workout.logbook.dto.workout.ExerciseUpdateRequest
import tom.com.workout.logbook.model.exercise.Exercise
import tom.com.workout.logbook.repository.ExerciseRepository
import tom.com.workout.logbook.security.AuthenticatedUser
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
        return Exercise(
            userId = AuthenticatedUser.id,
            name = exerciseCreateRequest.name,
            exerciseCategory = exerciseCreateRequest.exerciseCategory
        ).let(exerciseRepository::save)
    }

    fun updateExercise(exerciseUpdateRequest: ExerciseUpdateRequest, id: UUID): Exercise {
        return getExercise(id)
            .apply { name = exerciseUpdateRequest.name }
            .let(exerciseRepository::save)
    }

    fun deleteExercise(id: UUID) {
        getExercise(id).let(exerciseRepository::delete)
    }

    companion object {
        private const val EXERCISE_NOT_FOUND = "Exercise not found"
    }
}
