package tom.com.monkeylog.controller

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import tom.com.monkeylog.dto.workout.ExerciseGroupCreateRequest
import tom.com.monkeylog.dto.workout.ExerciseRowFieldResponse
import tom.com.monkeylog.dto.workout.ExerciseRowFieldUpdateRequest
import tom.com.monkeylog.dto.workout.ExerciseRowUpdateRequest
import tom.com.monkeylog.mapper.toResponse
import tom.com.monkeylog.mapper.toResponseWithWorkout
import tom.com.monkeylog.model.workout.ExerciseGroup
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

    @PatchMapping("/workouts/{workoutId}/exercise-groups/{exerciseGroupId}/exercise-rows/{exerciseRowId}")
    fun updateExerciseRow(
        @PathVariable workoutId: UUID,
        @PathVariable exerciseGroupId: UUID,
        @PathVariable exerciseRowId: UUID,
        @RequestBody exerciseRowUpdateRequest: ExerciseRowUpdateRequest
    ) = exerciseRowService.update(
        exerciseRowUpdateRequest,
        exerciseRowId
    ).toResponse()

    @PatchMapping("/workouts/{workoutId}/exercise-groups/{exerciseGroupId}/exercise-rows/{exerciseRowId}/exercise-row-fields/{exerciseRowFieldId}")
    fun updateExerciseRowField(
        @PathVariable workoutId: UUID,
        @PathVariable exerciseGroupId: UUID,
        @PathVariable exerciseRowId: UUID,
        @PathVariable exerciseRowFieldId: UUID,
        @RequestBody exerciseRowFieldUpdateRequest: ExerciseRowFieldUpdateRequest
    ): ExerciseRowFieldResponse {
        return exerciseRowService.updateField(exerciseRowFieldUpdateRequest, exerciseRowFieldId).toResponse()
    }

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
    fun getExerciseGroups(@PathVariable exerciseId: UUID) =
        exerciseGroupService.getByExerciseId(exerciseId).map(ExerciseGroup::toResponseWithWorkout)
}

