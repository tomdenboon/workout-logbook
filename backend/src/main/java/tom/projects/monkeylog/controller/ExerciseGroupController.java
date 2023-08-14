package tom.projects.monkeylog.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tom.projects.monkeylog.dto.workout.*;
import tom.projects.monkeylog.mapper.WorkoutMapper;
import tom.projects.monkeylog.service.ExerciseGroupService;
import tom.projects.monkeylog.service.ExerciseRowService;

@RestController
@RequiredArgsConstructor
@Tag(name = "Workout")
public class ExerciseGroupController {
    private final ExerciseGroupService exerciseGroupService;
    private final ExerciseRowService exerciseRowService;
    private final WorkoutMapper workoutMapper;

    @PostMapping("/workouts/{workoutId}/exercise-groups/{exerciseGroupId}/exercise-rows")
    ExerciseGroupResponse createExerciseRow(@PathVariable Long workoutId,
                                            @PathVariable Long exerciseGroupId) {
        return workoutMapper.exerciseGroupToExerciseGroupResponse(exerciseGroupService.addRow(exerciseGroupId));
    }

    @PatchMapping("/workouts/{workoutId}/exercise-groups/{exerciseGroupId}/exercise-rows/{exerciseRowId}")
    ExerciseRowResponse updateExerciseRow(@PathVariable Long workoutId,
                                          @PathVariable Long exerciseGroupId,
                                          @PathVariable Long exerciseRowId,
                                          @RequestBody ExerciseRowUpdateRequest exerciseRowUpdateRequest) {
        return workoutMapper.exerciseRowToExerciseRowResponse(exerciseRowService.update(exerciseRowUpdateRequest, exerciseRowId));
    }

    @PatchMapping("/workouts/{workoutId}/exercise-groups/{exerciseGroupId}/exercise-rows/{exerciseRowId}/exercise-row-fields/{exerciseRowFieldId}")
    ExerciseRowFieldResponse updateExerciseRowField(@PathVariable Long workoutId,
                                                    @PathVariable Long exerciseGroupId,
                                                    @PathVariable Long exerciseRowId,
                                                    @PathVariable Long exerciseRowFieldId,
                                                    @RequestBody ExerciseRowFieldUpdateRequest exerciseRowFieldUpdateRequest) {
        return workoutMapper.exerciseRowFieldToExerciseRowFieldResponse(
                exerciseRowService.updateField(exerciseRowFieldUpdateRequest, exerciseRowFieldId));
    }

    @PostMapping("/workouts/{workoutId}/exercise-groups")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void createExerciseGroup(@PathVariable Long workoutId, @RequestBody ExerciseGroupCreateRequest exerciseGroupCreateRequest) {
        exerciseGroupService.save(exerciseGroupCreateRequest, workoutId);
    }

    @DeleteMapping("/workouts/{workoutId}/exercise-group/{exerciseGroupId}/exercise-rows/{exerciseRowId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteExerciseRow(@PathVariable Long workoutId, @PathVariable Long exerciseGroupId, @PathVariable Long exerciseRowId) {
        exerciseRowService.delete(exerciseRowId);
    }

    @DeleteMapping("/workouts/{workoutId}/exercise-groups/{exerciseGroupId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteExerciseGroup(@PathVariable Long workoutId, @PathVariable Long exerciseGroupId) {
        exerciseGroupService.delete(exerciseGroupId);
    }
}
