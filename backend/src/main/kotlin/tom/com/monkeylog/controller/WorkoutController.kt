package tom.com.monkeylog.controller

import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springdoc.core.annotations.ParameterObject
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import tom.com.monkeylog.common.dto.IdProjection
import tom.com.monkeylog.common.dto.Page
import tom.com.monkeylog.common.mapper.toResponse
import tom.com.monkeylog.dto.workout.WorkoutCreateRequest
import tom.com.monkeylog.dto.workout.WorkoutFullResponse
import tom.com.monkeylog.dto.workout.WorkoutResponse
import tom.com.monkeylog.mapper.toFullResponse
import tom.com.monkeylog.mapper.toResponse
import tom.com.monkeylog.model.workout.WorkoutType
import tom.com.monkeylog.service.WorkoutService
import java.util.*

@RestController
@Tag(name = "Workout")
class WorkoutController(
    private val workoutService: WorkoutService,
) {
    @GetMapping("/workouts/{id}")
    fun getWorkout(@PathVariable id: UUID): WorkoutFullResponse = workoutService.getWorkout(id).toFullResponse()

    @GetMapping("/workouts/active")
    fun getActiveWorkout(): WorkoutFullResponse? = workoutService.activeWorkout()?.toFullResponse()

    @GetMapping("/workouts")
    fun getWorkouts(
        @ParameterObject pageable: Pageable,
        @RequestParam workoutType: WorkoutType
    ): Page<WorkoutFullResponse> {
        val uuids = workoutService.getPagedWorkoutIds(workoutType, pageable);
        val workouts =
            workoutService.getWorkouts(uuids.content.map(IdProjection::id)).associate { it.id to it.toFullResponse() }

        return uuids.toResponse { workouts[it.id]!! }
    }

    @PostMapping("/workouts")
    fun createWorkout(@RequestBody workoutRequest: @Valid WorkoutCreateRequest): WorkoutResponse =
        workoutService.save(workoutRequest).toResponse()

    @PostMapping("/workouts/{id}/duplicate")
    fun duplicateWorkout(@PathVariable id: UUID): WorkoutResponse =
        workoutService.cloneToTemplate(id).toResponse()

    @PostMapping("/workouts/start")
    fun startEmptyWorkout(): WorkoutResponse = workoutService.startWorkout().toResponse()

    @PostMapping("/workouts/{id}/start")
    fun startWorkout(@PathVariable id: UUID): WorkoutResponse = workoutService.startWorkout(id).toResponse()

    @PostMapping("/workouts/complete")
    fun completeWorkout(): WorkoutResponse = workoutService.complete().toResponse()

    @DeleteMapping("/workouts/{id}")
    @ApiResponse(responseCode = "204")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteWorkout(@PathVariable id: UUID) {
        workoutService.delete(id)
    }
}
