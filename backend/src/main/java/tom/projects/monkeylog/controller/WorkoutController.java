package tom.projects.monkeylog.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
@Tag(name="Workout")
public class WorkoutController {
    private final WorkoutService workoutService;
    private final WorkoutMapper workoutMapper;

    @GetMapping("/workouts/{id}")
    WorkoutFullResponse getWorkout(@PathVariable Long id) {
        return workoutMapper.workoutToFullWorkoutResponse(workoutService.get(id));
    }

    @GetMapping("/workouts/active")
    WorkoutResponse getActiveWorkout() {
        return workoutMapper.workoutToWorkoutResponse(workoutService.getActive());
    }

    @GetMapping("/workouts")
    List<WorkoutFullResponse> allWorkouts(@RequestParam Type type) {
        return workoutMapper.workoutsToFullWorkoutResponses(workoutService.all(type));
    }

    @PostMapping("/workouts")
    WorkoutResponse createWorkout(@RequestBody @Valid WorkoutCreateRequest workoutRequest) {
        return workoutMapper.workoutToWorkoutResponse(workoutService.save(workoutRequest));
    }

    @PostMapping("/workouts/{id}/duplicate")
    WorkoutResponse duplicateWorkout(@PathVariable Long id) {
        return workoutMapper.workoutToWorkoutResponse(workoutService.cloneToTemplate(id));
    }

    @PostMapping("/workouts/start")
    WorkoutResponse startEmptyWorkout() {
        return workoutMapper.workoutToWorkoutResponse(workoutService.start());
    }

    @PostMapping("/workouts/{id}/start")
    WorkoutResponse startWorkout(@PathVariable Long id) {
        return workoutMapper.workoutToWorkoutResponse(workoutService.start(id));
    }

    @PostMapping("/workouts/complete")
    WorkoutResponse completeWorkout() {
        return workoutMapper.workoutToWorkoutResponse(workoutService.complete());
    }

    @DeleteMapping("/workouts/{id}")
    @ApiResponse(responseCode = "204")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteWorkout(@PathVariable Long id) {
        workoutService.delete(id);
    }
}
