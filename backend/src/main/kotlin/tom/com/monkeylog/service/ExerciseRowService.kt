package tom.com.monkeylog.service

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.monkeylog.dto.workout.ExerciseRowFieldUpdateRequest
import tom.com.monkeylog.dto.workout.ExerciseRowUpdateRequest
import tom.com.monkeylog.model.workout.ExerciseRow
import tom.com.monkeylog.model.workout.ExerciseRowField
import tom.com.monkeylog.repository.ExerciseGroupRepository
import tom.com.monkeylog.repository.ExerciseRowFieldRepository
import tom.com.monkeylog.repository.ExerciseRowRepository
import tom.com.monkeylog.security.AuthenticatedUser
import java.util.*

@Service
class ExerciseRowService(
    private val exerciseGroupRepository: ExerciseGroupRepository,
    private val exerciseRowRepository: ExerciseRowRepository,
    private val exerciseRowFieldRepository: ExerciseRowFieldRepository,
) {
    fun get(id: UUID): ExerciseRow {
        return exerciseRowRepository.findById(id)
            .filter(AuthenticatedUser::isResourceOwner)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, ROW_NOT_FOUND) }
    }

    fun getField(id: UUID): ExerciseRowField {
        return exerciseRowFieldRepository.findById(id)
            .filter(AuthenticatedUser::isResourceOwner)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, ROW_NOT_FOUND) }
    }

    fun update(exerciseRowUpdateRequest: ExerciseRowUpdateRequest, id: UUID): ExerciseRow {
        val exerciseRow: ExerciseRow = get(id)
        exerciseRow.lifted = exerciseRowUpdateRequest.lifted
        return exerciseRowRepository.save(exerciseRow)
    }

    fun updateField(
        exerciseRowFieldUpdateRequest: ExerciseRowFieldUpdateRequest,
        exerciseRowFieldId: UUID
    ): ExerciseRowField {
        return exerciseRowFieldRepository.save(getField(exerciseRowFieldId).apply {
            value = exerciseRowFieldUpdateRequest.value
        })
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

    companion object {
        private const val ROW_NOT_FOUND = "Exercise row not found"
    }
}
