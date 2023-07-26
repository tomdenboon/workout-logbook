package tom.projects.monkeylog.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tom.projects.monkeylog.dto.exercise.ExerciseCreateRequest;
import tom.projects.monkeylog.dto.exercise.ExerciseResponse;
import tom.projects.monkeylog.dto.exercise.ExerciseTypeResponse;
import tom.projects.monkeylog.dto.exercise.ExerciseUpdateRequest;
import tom.projects.monkeylog.mapper.ExerciseMapper;
import tom.projects.monkeylog.service.ExerciseService;

import java.util.List;

@RestController
@Tag(name = "Exercise")
@RequiredArgsConstructor
public class ExerciseController {
    private final ExerciseService exerciseService;
    private final ExerciseMapper exerciseMapper;

    @GetMapping("/exercises")
    List<ExerciseResponse> allExercises() {
        return exerciseMapper.exercisesToExerciseResponses(exerciseService.all());
    }

    @GetMapping("/exercises/{id}")
    ExerciseResponse getExercise(@PathVariable Long id) {
        return exerciseMapper.exerciseToExerciseResponse(exerciseService.get(id));
    }

    @PostMapping("/exercises")
    ExerciseResponse saveExercise(@RequestBody ExerciseCreateRequest exerciseCreateRequest) {
        return exerciseMapper.exerciseToExerciseResponse(exerciseService.save(exerciseCreateRequest));
    }

    @PatchMapping("/exercises/{id}")
    ExerciseResponse updateExercise(@RequestBody ExerciseUpdateRequest exerciseUpdateRequest, @PathVariable Long id) {
        return exerciseMapper.exerciseToExerciseResponse(exerciseService.update(exerciseUpdateRequest, id));
    }

    @DeleteMapping("/exercises/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteExercise(@PathVariable Long id) {
        exerciseService.delete(id);
    }

    @GetMapping("/exercise-types")
    List<ExerciseTypeResponse> getExerciseTypes() {
        return exerciseMapper.exerciseTypesToExerciseTypeResponses(exerciseService.getExerciseTypes());
    }
}

