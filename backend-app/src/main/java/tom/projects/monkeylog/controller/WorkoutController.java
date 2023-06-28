package tom.projects.monkeylog.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tom.projects.monkeylog.dto.workout.WorkoutFullResponse;
import tom.projects.monkeylog.dto.workout.WorkoutRequest;
import tom.projects.monkeylog.dto.workout.WorkoutResponse;
import tom.projects.monkeylog.mapper.WorkoutMapper;
import tom.projects.monkeylog.model.workout.Workout;
import tom.projects.monkeylog.service.WorkoutService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class WorkoutController {
    private final WorkoutService workoutService;
    private final WorkoutMapper workoutMapper;

    @GetMapping("/workout/{id}")
    WorkoutFullResponse get(@PathVariable Long id) {
        return workoutMapper.workoutToFullWorkoutResponse(workoutService.get(id));
    }

    @GetMapping("/workout/active")
    WorkoutResponse getActive() {
        return workoutMapper.workoutToWorkoutResponse(workoutService.getActive());
    }

    @GetMapping("/workout")
    List<WorkoutFullResponse> all(@RequestParam Workout.Type type) {
        return workoutMapper.workoutsToFullWorkoutResponses(workoutService.all(type));
    }

    @PostMapping("/workout")
    WorkoutResponse create(@RequestBody WorkoutRequest workoutRequest) {
        return workoutMapper.workoutToWorkoutResponse(workoutService.save(workoutRequest));
    }

    @PostMapping("/workout/{id}/clone")
    WorkoutResponse clone(@PathVariable Long id) {
        return workoutMapper.workoutToWorkoutResponse(workoutService.clone(id));
    }

    @PostMapping("/workout/start")
    WorkoutResponse start() {
        return workoutMapper.workoutToWorkoutResponse(workoutService.start());
    }

    @PostMapping("/workout/{id}/start")
    WorkoutResponse start(@PathVariable Long id) {
        return workoutMapper.workoutToWorkoutResponse(workoutService.start(id));
    }

    @PostMapping("/workout/complete")
    WorkoutResponse complete() {
        return workoutMapper.workoutToWorkoutResponse(workoutService.complete());
    }

    @DeleteMapping("/workout/{id}")
    void destroy(@PathVariable Long id) {
        workoutService.delete(id);
    }
}
