package tom.projects.monkeylog.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tom.projects.monkeylog.dto.exercise.ExerciseCreateRequest;
import tom.projects.monkeylog.dto.exercise.ExerciseResponse;
import tom.projects.monkeylog.dto.exercise.ExerciseTypeResponse;
import tom.projects.monkeylog.dto.exercise.ExerciseUpdateRequest;
import tom.projects.monkeylog.mapper.ExerciseMapper;
import tom.projects.monkeylog.service.ExerciseService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ExerciseController {
    private final ExerciseService exerciseService;
    private final ExerciseMapper exerciseMapper;

    @GetMapping("/exercise")
    List<ExerciseResponse> all() {
        return exerciseMapper.exercisesToExerciseResponses(exerciseService.all());
    }

    @GetMapping("/exercise/{id}")
    ExerciseResponse get(@PathVariable Long id) {
        return exerciseMapper.exerciseToExerciseResponse(exerciseService.get(id));
    }

    @PostMapping("/exercise")
    ExerciseResponse save(@RequestBody ExerciseCreateRequest exerciseCreateRequest) {
        return exerciseMapper.exerciseToExerciseResponse(exerciseService.save(exerciseCreateRequest));
    }

    @PatchMapping("/exercise/{id}")
    ExerciseResponse update(@RequestBody ExerciseUpdateRequest exerciseUpdateRequest, @PathVariable Long id) {
        return exerciseMapper.exerciseToExerciseResponse(exerciseService.update(exerciseUpdateRequest, id));
    }

    @DeleteMapping("/exercise/{id}")
    void destroy(@PathVariable Long id) {
        exerciseService.delete(id);
    }

    @GetMapping("/exercise_type")
    List<ExerciseTypeResponse> getExerciseTypes() {
        return exerciseMapper.exerciseTypesToExerciseTypeResponses(exerciseService.getExerciseTypes());
    }
}

