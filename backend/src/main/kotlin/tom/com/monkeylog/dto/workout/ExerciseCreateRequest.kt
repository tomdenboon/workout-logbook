package tom.com.monkeylog.dto.workout

import jakarta.validation.constraints.NotBlank
import tom.com.monkeylog.model.exercise.ExerciseCategory

data class ExerciseCreateRequest(
    @NotBlank
    val name: String,
    val exerciseCategory: ExerciseCategory
)