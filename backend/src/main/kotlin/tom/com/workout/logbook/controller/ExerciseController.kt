package tom.com.workout.logbook.controller

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import tom.com.workout.logbook.dto.workout.ExerciseCategoryResponse
import tom.com.workout.logbook.dto.workout.ExerciseCreateRequest
import tom.com.workout.logbook.dto.workout.ExerciseUpdateRequest
import tom.com.workout.logbook.mapper.toResponse
import tom.com.workout.logbook.model.exercise.ExerciseCategory
import tom.com.workout.logbook.service.ExerciseService
import java.util.*

@RestController
@Tag(name = "Exercise")
class ExerciseController(
    private val exerciseService: ExerciseService,
) {
    @GetMapping("/exercises")
    fun getExercises() = exerciseService.allExercises().map { it.toResponse() }

    @GetMapping("/exercises/{id}")
    fun getExercise(@PathVariable id: UUID) = exerciseService.getExercise(id).toResponse()

    @PostMapping("/exercises")
    fun createExercise(@RequestBody exerciseCreateRequest: ExerciseCreateRequest) =
        exerciseService.saveExercise(exerciseCreateRequest).toResponse()

    @PatchMapping("/exercises/{id}")
    fun updateExercise(
        @RequestBody exerciseUpdateRequest: ExerciseUpdateRequest,
        @PathVariable id: UUID
    ) = exerciseService.updateExercise(exerciseUpdateRequest, id).toResponse()

    @DeleteMapping("/exercises/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteExercise(@PathVariable id: UUID) = exerciseService.deleteExercise(id)

    @GetMapping("/exercises/categories")
    fun getExerciseCategories(): Map<ExerciseCategory, ExerciseCategoryResponse> {
        return ExerciseCategory.values()
            .associateWith { ExerciseCategoryResponse(it.statistics, it.validFields) }
    }
}