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

    @GetMapping("/exercises")
    List<ExerciseResponse> all() {
        return exerciseMapper.exercisesToExerciseResponses(exerciseService.all());
    }

    @GetMapping("/exercises/{id}")
    ExerciseResponse get(@PathVariable Long id) {
        return exerciseMapper.exerciseToExerciseResponse(exerciseService.get(id));
    }

    @PostMapping("/exercises")
    ExerciseResponse save(@RequestBody ExerciseCreateRequest exerciseCreateRequest) {
        return exerciseMapper.exerciseToExerciseResponse(exerciseService.save(exerciseCreateRequest));
    }

    @PatchMapping("/exercises/{id}")
    ExerciseResponse update(@RequestBody ExerciseUpdateRequest exerciseUpdateRequest, @PathVariable Long id) {
        return exerciseMapper.exerciseToExerciseResponse(exerciseService.update(exerciseUpdateRequest, id));
    }

    @DeleteMapping("/exercises/{id}")
    void destroy(@PathVariable Long id) {
        exerciseService.delete(id);
    }

    @GetMapping("/exercise-types")
    List<ExerciseTypeResponse> getExerciseTypes() {
        return exerciseMapper.exerciseTypesToExerciseTypeResponses(exerciseService.getExerciseTypes());
    }
}

