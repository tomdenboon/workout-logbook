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

    @PostMapping("/exercise-groups/{id}/add-row")
    ExerciseGroupResponse addRow(@PathVariable Long id) {
        return workoutMapper.exerciseGroupToExerciseGroupResponse(exerciseGroupService.addRow(id));
    }

    @PatchMapping("/exercise-rows/{id}")
    ExerciseRowResponse updateRow(@RequestBody ExerciseRowUpdateRequest exerciseRowUpdateRequest,
            @PathVariable Long id) {
        return workoutMapper.exerciseRowToExerciseRowResponse(exerciseRowService.update(exerciseRowUpdateRequest, id));
    }

    @PatchMapping("/exercise-row-fields/{exerciseRowFieldId}")
    ExerciseRowFieldResponse updateRowField(@RequestBody ExerciseRowFieldUpdateRequest exerciseRowFieldUpdateRequest,
            @PathVariable Long exerciseRowFieldId) {
        return workoutMapper.exerciseRowFieldToExerciseRowFieldResponse(
                exerciseRowService.updateField(exerciseRowFieldUpdateRequest, exerciseRowFieldId));
    }

    @PostMapping("/workouts/{workoutId}/exercise-groups")
    void save(@RequestBody ExerciseGroupCreateRequest exerciseGroupCreateRequest, @PathVariable Long workoutId) {
        exerciseGroupService.save(exerciseGroupCreateRequest, workoutId);
    }

    @DeleteMapping("/exercise-rows/{id}")
    void destroyRow(@PathVariable Long id) {
        exerciseRowService.delete(id);
    }

    @DeleteMapping("/exercise-groups/{id}")
    void destroy(@PathVariable Long id) {
        exerciseGroupService.delete(id);
    }
}