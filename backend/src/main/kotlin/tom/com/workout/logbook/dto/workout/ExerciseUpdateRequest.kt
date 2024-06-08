package tom.com.workout.logbook.dto.workout

import jakarta.validation.constraints.NotBlank

data class ExerciseUpdateRequest(@NotBlank val name: String)
