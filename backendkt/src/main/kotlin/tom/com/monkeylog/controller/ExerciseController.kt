package tom.com.monkeylog.controller

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import tom.com.monkeylog.dto.workout.ExerciseCreateRequest
import tom.com.monkeylog.dto.workout.ExerciseUpdateRequest
import tom.com.monkeylog.mapper.toResponse
import tom.com.monkeylog.model.exercise.ExerciseCategory
import tom.com.monkeylog.model.exercise.ExerciseType
import tom.com.monkeylog.service.ExerciseService
import java.util.*

@RestController
@Tag(name = "Exercise")
class ExerciseController(
    private val exerciseService: ExerciseService,
) {
    @GetMapping("/exercises")
    fun exercises() = exerciseService.allExercises().map { it.toResponse() }

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

    @GetMapping("/exercises/types")
    fun exerciseTypes() = ExerciseType.values().map { it.toResponse() }

    @GetMapping("/exercises/categories")
    fun exerciseCategories() = ExerciseCategory.values().map { it.toResponse() }
}
