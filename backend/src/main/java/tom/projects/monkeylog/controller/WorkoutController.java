package tom.projects.monkeylog.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tom.projects.monkeylog.common.dto.Page;
import tom.projects.monkeylog.common.mapper.PageMapper;
import tom.projects.monkeylog.dto.workout.WorkoutCreateRequest;
import tom.projects.monkeylog.dto.workout.WorkoutFullResponse;
import tom.projects.monkeylog.dto.workout.WorkoutResponse;
import tom.projects.monkeylog.mapper.WorkoutMapper;
import tom.projects.monkeylog.model.workout.Type;
import tom.projects.monkeylog.service.WorkoutService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name="Workout")
public class WorkoutController {
    private final WorkoutService workoutService;
    private final WorkoutMapper workoutMapper;
    private final PageMapper pageMapper;

    @GetMapping("/workouts/{id}")
    WorkoutFullResponse getWorkout(@PathVariable Long id) {
        return workoutMapper.workoutToFullWorkoutResponse(workoutService.getWorkout(id));
    }

    @GetMapping("/workouts/active")
    WorkoutResponse getActiveWorkout() {
        return workoutMapper.workoutToWorkoutResponse(workoutService.getActiveWorkout());
    }

    @GetMapping("/workouts")
    Page<WorkoutFullResponse> get(@ParameterObject Pageable pageable, @RequestParam Type type, @RequestParam(required = false) LocalDateTime after) {
        return pageMapper.map(workoutService.getWorkouts(type, after, pageable), workoutMapper::workoutsToFullWorkoutResponses);
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
        return workoutMapper.workoutToWorkoutResponse(workoutService.startWorkout());
    }

    @PostMapping("/workouts/{id}/start")
    WorkoutResponse startWorkout(@PathVariable Long id) {
        return workoutMapper.workoutToWorkoutResponse(workoutService.startWorkout(id));
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
