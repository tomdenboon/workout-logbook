package tom.projects.monkeylog.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tom.projects.monkeylog.dto.workout.*;
import tom.projects.monkeylog.mapper.ExerciseMapper;
import tom.projects.monkeylog.model.exercise.ExerciseCategory;
import tom.projects.monkeylog.model.exercise.ExerciseType;
import tom.projects.monkeylog.service.ExerciseService;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@Tag(name = "Exercise")
@RequiredArgsConstructor
public class ExerciseController {
    private final ExerciseService exerciseService;
    private final ExerciseMapper exerciseMapper;

    @GetMapping("/exercises")
    List<ExerciseResponse> getExercises() {
        return exerciseMapper.exercisesToExerciseResponses(exerciseService.all());
    }

    @GetMapping("/exercises/{id}")
    ExerciseResponse getExercise(@PathVariable UUID id) {
        return exerciseMapper.exerciseToExerciseResponse(exerciseService.get(id));
    }

    @PostMapping("/exercises")
    ExerciseResponse createExercise(@RequestBody ExerciseCreateRequest exerciseCreateRequest) {
        return exerciseMapper.exerciseToExerciseResponse(exerciseService.save(exerciseCreateRequest));
    }

    @PatchMapping("/exercises/{id}")
    ExerciseResponse updateExercise(@RequestBody ExerciseUpdateRequest exerciseUpdateRequest, @PathVariable UUID id) {
        return exerciseMapper.exerciseToExerciseResponse(exerciseService.update(exerciseUpdateRequest, id));
    }

    @DeleteMapping("/exercises/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteExercise(@PathVariable UUID id) {
        exerciseService.delete(id);
    }

    @GetMapping("/exercises/types")
    List<ExerciseTypeResponse> getExerciseTypes() {
        return Arrays.stream(ExerciseType.values()).map(exerciseMapper::exerciseTypeToExerciseTypeResponse).toList();
    }

    @GetMapping("/exercises/categories")
    List<ExerciseCategoryResponse> getExerciseCategories() {
        return Arrays.stream(ExerciseCategory.values()).map(exerciseMapper::exerciseCategoryToExerciseCategoryResponse).toList();
    }
}

