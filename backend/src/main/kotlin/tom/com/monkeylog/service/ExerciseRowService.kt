package tom.com.monkeylog.service

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.monkeylog.dto.workout.ExerciseRowUpdateRequest
import tom.com.monkeylog.model.workout.ExerciseRow
import tom.com.monkeylog.repository.ExerciseGroupRepository
import tom.com.monkeylog.repository.ExerciseRowRepository
import tom.com.monkeylog.security.AuthenticatedUser
import java.util.*

@Service
class ExerciseRowService(
    private val exerciseGroupRepository: ExerciseGroupRepository,
    private val exerciseRowRepository: ExerciseRowRepository,
) {
    fun get(id: UUID): ExerciseRow {
        return exerciseRowRepository.findById(id)
            .filter(AuthenticatedUser::isResourceOwner)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Exercise row not found") }
    }

    fun update(exerciseRowUpdateRequest: ExerciseRowUpdateRequest, id: UUID): ExerciseRow {
        val exerciseRow: ExerciseRow = get(id)
        exerciseRow.lifted = exerciseRowUpdateRequest.lifted
        return exerciseRowRepository.save(exerciseRow)
    }

    fun delete(id: UUID) {
        val exerciseRow = get(id)
        val exerciseGroup = exerciseRow.exerciseGroup
        exerciseGroup.exerciseRows.remove(exerciseRow)
        if (exerciseGroup.exerciseRows.size <= 1) {
            exerciseGroupRepository.delete(exerciseGroup)
        } else {
            exerciseRowRepository.delete(exerciseRow)
        }
    }
}
