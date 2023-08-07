package tom.projects.monkeylog.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tom.projects.monkeylog.dto.workout.*;
import tom.projects.monkeylog.mapper.ExerciseMapper;
import tom.projects.monkeylog.service.ExerciseService;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    ExerciseResponse getExercise(@PathVariable Long id) {
        return exerciseMapper.exerciseToExerciseResponse(exerciseService.get(id));
    }

    @PostMapping("/exercises")
    ExerciseResponse createExercise(@RequestBody ExerciseCreateRequest exerciseCreateRequest) {
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
}

