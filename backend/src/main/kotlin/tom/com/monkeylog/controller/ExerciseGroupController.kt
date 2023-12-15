package tom.com.monkeylog.controller

import io.swagger.v3.oas.annotations.tags.Tag
import org.springdoc.core.annotations.ParameterObject
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import tom.com.monkeylog.common.dto.IdProjection
import tom.com.monkeylog.common.dto.Page
import tom.com.monkeylog.common.mapper.toResponse
import tom.com.monkeylog.dto.workout.*
import tom.com.monkeylog.mapper.toResponse
import tom.com.monkeylog.mapper.toResponseWithWorkout
import tom.com.monkeylog.service.ExerciseGroupService
import tom.com.monkeylog.service.ExerciseRowService
import java.util.*

@RestController
@Tag(name = "Workout")
class ExerciseGroupController(
    private val exerciseGroupService: ExerciseGroupService,
    private val exerciseRowService: ExerciseRowService,
) {
    @PostMapping("/workouts/{workoutId}/exercise-groups/{exerciseGroupId}/exercise-rows")
    fun createExerciseRow(
        @PathVariable workoutId: UUID,
        @PathVariable exerciseGroupId: UUID
    ) = exerciseGroupService.addRow(exerciseGroupId).toResponse()

    @PutMapping("/workouts/{workoutId}/exercise-groups/{exerciseGroupId}/exercise-rows/{exerciseRowId}")
    fun updateExerciseRow(
        @PathVariable workoutId: UUID,
        @PathVariable exerciseGroupId: UUID,
        @PathVariable exerciseRowId: UUID,
        @RequestBody exerciseRowUpdateRequest: ExerciseRowUpdateRequest
    ) = exerciseRowService.update(
        exerciseRowUpdateRequest,
        exerciseRowId
    ).toResponse()

    @PostMapping("/workouts/{workoutId}/exercise-groups")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun createExerciseGroup(
        @PathVariable workoutId: UUID,
        @RequestBody exerciseGroupCreateRequest: ExerciseGroupCreateRequest
    ) = exerciseGroupService.save(exerciseGroupCreateRequest, workoutId)

    @DeleteMapping("/workouts/{workoutId}/exercise-group/{exerciseGroupId}/exercise-rows/{exerciseRowId}")
    @ResponseStatus(
        HttpStatus.NO_CONTENT
    )
    fun deleteExerciseRow(
        @PathVariable workoutId: UUID,
        @PathVariable exerciseGroupId: UUID,
        @PathVariable exerciseRowId: UUID
    ) = exerciseRowService.delete(exerciseRowId)

    @DeleteMapping("/workouts/{workoutId}/exercise-groups/{exerciseGroupId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteExerciseGroup(@PathVariable workoutId: UUID, @PathVariable exerciseGroupId: UUID) =
        exerciseGroupService.delete(exerciseGroupId)

    @GetMapping("/exercises/{exerciseId}/exercise-groups")
    fun getExerciseGroups(
        @PathVariable exerciseId: UUID,
        @ParameterObject pageable: Pageable
    ): Page<ExerciseGroupWithWorkoutResponse> {
        val uuids = exerciseGroupService.getExerciseGroupsByExerciseId(exerciseId, pageable)
        val exerciseGroups =
            exerciseGroupService.getExerciseGroups(uuids.content.map(IdProjection::id))
                .associate { it.id!! to it.toResponseWithWorkout() }

        return uuids.toResponse { exerciseGroups[it.id]!! }
    }
}

