package tom.projects.monkeylog.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tom.projects.monkeylog.dto.workout.*;
import tom.projects.monkeylog.mapper.WorkoutMapper;
import tom.projects.monkeylog.service.ExerciseGroupService;
import tom.projects.monkeylog.service.ExerciseRowService;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Tag(name = "Workout")
public class ExerciseGroupController {
    private final ExerciseGroupService exerciseGroupService;
    private final ExerciseRowService exerciseRowService;
    private final WorkoutMapper workoutMapper;

    @PostMapping("/workouts/{workoutId}/exercise-groups/{exerciseGroupId}/exercise-rows")
    ExerciseGroupResponse createExerciseRow(@PathVariable UUID workoutId,
                                            @PathVariable UUID exerciseGroupId) {
        return workoutMapper.exerciseGroupToExerciseGroupResponse(exerciseGroupService.addRow(exerciseGroupId));
    }

    @PatchMapping("/workouts/{workoutId}/exercise-groups/{exerciseGroupId}/exercise-rows/{exerciseRowId}")
    ExerciseRowResponse updateExerciseRow(@PathVariable UUID workoutId,
                                          @PathVariable UUID exerciseGroupId,
                                          @PathVariable UUID exerciseRowId,
                                          @RequestBody ExerciseRowUpdateRequest exerciseRowUpdateRequest) {
        return workoutMapper.exerciseRowToExerciseRowResponse(exerciseRowService.update(exerciseRowUpdateRequest, exerciseRowId));
    }

    @PatchMapping("/workouts/{workoutId}/exercise-groups/{exerciseGroupId}/exercise-rows/{exerciseRowId}/exercise-row-fields/{exerciseRowFieldId}")
    ExerciseRowFieldResponse updateExerciseRowField(@PathVariable UUID workoutId,
                                                    @PathVariable UUID exerciseGroupId,
                                                    @PathVariable UUID exerciseRowId,
                                                    @PathVariable UUID exerciseRowFieldId,
                                                    @RequestBody ExerciseRowFieldUpdateRequest exerciseRowFieldUpdateRequest) {
        return workoutMapper.exerciseRowFieldToExerciseRowFieldResponse(
                exerciseRowService.updateField(exerciseRowFieldUpdateRequest, exerciseRowFieldId));
    }

    @PostMapping("/workouts/{workoutId}/exercise-groups")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void createExerciseGroup(@PathVariable UUID workoutId, @RequestBody ExerciseGroupCreateRequest exerciseGroupCreateRequest) {
        exerciseGroupService.save(exerciseGroupCreateRequest, workoutId);
    }

    @DeleteMapping("/workouts/{workoutId}/exercise-group/{exerciseGroupId}/exercise-rows/{exerciseRowId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteExerciseRow(@PathVariable UUID workoutId, @PathVariable UUID exerciseGroupId, @PathVariable UUID exerciseRowId) {
        exerciseRowService.delete(exerciseRowId);
    }

    @DeleteMapping("/workouts/{workoutId}/exercise-groups/{exerciseGroupId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteExerciseGroup(@PathVariable UUID workoutId, @PathVariable UUID exerciseGroupId) {
        exerciseGroupService.delete(exerciseGroupId);
    }
}
