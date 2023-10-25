package tom.com.monkeylog.controller

import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springdoc.core.annotations.ParameterObject
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import tom.com.monkeylog.common.dto.Page
import tom.com.monkeylog.common.mapper.toResponse
import tom.com.monkeylog.dto.workout.WorkoutCreateRequest
import tom.com.monkeylog.dto.workout.WorkoutFullResponse
import tom.com.monkeylog.mapper.toFullResponse
import tom.com.monkeylog.mapper.toResponse
import tom.com.monkeylog.model.workout.WorkoutType
import tom.com.monkeylog.service.WorkoutService
import java.time.Instant
import java.util.*

@RestController
@Tag(name = "Workout")
class WorkoutController(
    private val workoutService: WorkoutService,
) {
    @GetMapping("/workouts/{id}")
    fun getWorkout(@PathVariable id: UUID) = workoutService.getWorkout(id).toFullResponse()

    @GetMapping("/workouts/active")
    fun getActiveWorkout() = workoutService.activeWorkout()?.toFullResponse()

    @GetMapping("/workouts")
    fun getWorkouts(
        @ParameterObject pageable: Pageable,
        @RequestParam workoutType: WorkoutType,
        @RequestParam(required = false) after: Instant?
    ): Page<WorkoutFullResponse> =
        workoutService.getWorkouts(workoutType, after, pageable).toResponse { it.toFullResponse() }

    @PostMapping("/workouts")
    fun createWorkout(@RequestBody workoutRequest: @Valid WorkoutCreateRequest) =
        workoutService.save(workoutRequest).toResponse()

    @PostMapping("/workouts/{id}/duplicate")
    fun duplicateWorkout(@PathVariable id: UUID) =
        workoutService.cloneToTemplate(id).toResponse()

    @PostMapping("/workouts/start")
    fun startEmptyWorkout() = workoutService.startWorkout().toResponse()

    @PostMapping("/workouts/{id}/start")
    fun startWorkout(@PathVariable id: UUID) = workoutService.startWorkout(id).toResponse()

    @PostMapping("/workouts/complete")
    fun completeWorkout() = workoutService.complete().toResponse()

    @DeleteMapping("/workouts/{id}")
    @ApiResponse(responseCode = "204")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteWorkout(@PathVariable id: UUID) = workoutService.delete(id)
}
