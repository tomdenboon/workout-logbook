package tom.projects.monkeylog.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tom.projects.monkeylog.dto.workout.WorkoutCreateRequest;
import tom.projects.monkeylog.dto.workout.WorkoutFullResponse;
import tom.projects.monkeylog.dto.workout.WorkoutResponse;
import tom.projects.monkeylog.mapper.WorkoutMapper;
import tom.projects.monkeylog.model.workout.Type;
import tom.projects.monkeylog.service.WorkoutService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class WorkoutController {
    private final WorkoutService workoutService;
    private final WorkoutMapper workoutMapper;

    @GetMapping("/workouts/{id}")
    WorkoutFullResponse get(@PathVariable Long id) {
        return workoutMapper.workoutToFullWorkoutResponse(workoutService.get(id));
    }

    @GetMapping("/workouts/active")
    WorkoutResponse getActive() {
        return workoutMapper.workoutToWorkoutResponse(workoutService.getActive());
    }

    @GetMapping("/workouts")
    List<WorkoutFullResponse> all(@RequestParam Type type) {
        return workoutMapper.workoutsToFullWorkoutResponses(workoutService.all(type));
    }

    @PostMapping("/workouts")
    WorkoutResponse create(@RequestBody @Valid WorkoutCreateRequest workoutRequest) {
        return workoutMapper.workoutToWorkoutResponse(workoutService.save(workoutRequest));
    }

    @PostMapping("/workouts/{id}/duplicate")
    WorkoutResponse cloneToTemplate(@PathVariable Long id) {
        return workoutMapper.workoutToWorkoutResponse(workoutService.cloneToTemplate(id));
    }

    @PostMapping("/workouts/start")
    WorkoutResponse start() {
        return workoutMapper.workoutToWorkoutResponse(workoutService.start());
    }

    @PostMapping("/workouts/{id}/start")
    WorkoutResponse start(@PathVariable Long id) {
        return workoutMapper.workoutToWorkoutResponse(workoutService.start(id));
    }

    @PostMapping("/workouts/complete")
    WorkoutResponse complete() {
        return workoutMapper.workoutToWorkoutResponse(workoutService.complete());
    }

    @DeleteMapping("/workouts/{id}")
    void destroy(@PathVariable Long id) {
        workoutService.delete(id);
    }
}
