package tom.projects.monkeylog.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tom.projects.monkeylog.dto.workout.*;
import tom.projects.monkeylog.mapper.WorkoutMapper;
import tom.projects.monkeylog.service.ExerciseGroupService;
import tom.projects.monkeylog.service.ExerciseRowService;

@RestController
@RequiredArgsConstructor
public class ExerciseGroupController {
    private final ExerciseGroupService exerciseGroupService;
    private final ExerciseRowService exerciseRowService;
    private final WorkoutMapper workoutMapper;

    @PostMapping("/exercise_group/{id}/add_row")
    ExerciseGroupResponse addRow(@PathVariable Long id) {
        return workoutMapper.exerciseGroupToExerciseGroupResponse(exerciseGroupService.addRow(id));
    }

    @PostMapping("/exercise_group/{id}/swap_row")
    void swapRow(@RequestBody ExerciseRowSwapRequest exerciseRowSwapRequest, @PathVariable Long id) {
        exerciseGroupService.swapRow(id, exerciseRowSwapRequest);
    }

    @PatchMapping("/exercise_row/{id}")
    ExerciseRowResponse updateRow(@RequestBody ExerciseRowUpdateRequest exerciseRowUpdateRequest,
            @PathVariable Long id) {
        return workoutMapper.exerciseRowToExerciseRowResponse(exerciseRowService.update(exerciseRowUpdateRequest, id));
    }

    @PatchMapping("/exercise_row_field/{exerciseRowFieldId}")
    ExerciseRowFieldResponse updateRowField(@RequestBody ExerciseRowFieldUpdateRequest exerciseRowFieldUpdateRequest,
            @PathVariable Long exerciseRowFieldId) {
        return workoutMapper.exerciseRowFieldToExerciseRowFieldResponse(
                exerciseRowService.updateField(exerciseRowFieldUpdateRequest, exerciseRowFieldId));
    }

    @PostMapping("/workout/{workoutId}/exercise_group")
    void save(@RequestBody ExerciseGroupCreateRequest exerciseGroupCreateRequest, @PathVariable Long workoutId) {
        exerciseGroupService.save(exerciseGroupCreateRequest, workoutId);
    }

    @DeleteMapping("/exercise_row/{id}")
    void destroyRow(@PathVariable Long id) {
        exerciseRowService.delete(id);
    }

    @DeleteMapping("/exercise_group/{id}")
    void destroy(@PathVariable Long id) {
        exerciseGroupService.delete(id);
    }
}
