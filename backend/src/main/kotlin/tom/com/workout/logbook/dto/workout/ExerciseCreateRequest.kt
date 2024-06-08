package tom.com.workout.logbook.dto.workout

import jakarta.validation.constraints.NotBlank
import tom.com.workout.logbook.model.exercise.ExerciseCategory

data class ExerciseCreateRequest(
    @NotBlank
    val name: String,
    val exerciseCategory: ExerciseCategory
)