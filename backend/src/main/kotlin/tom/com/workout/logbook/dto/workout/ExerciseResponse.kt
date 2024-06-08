package tom.com.workout.logbook.dto.workout

import tom.com.workout.logbook.model.exercise.ExerciseCategory
import java.util.*

data class ExerciseResponse(
    val id: UUID,
    val name: String,
    val exerciseCategory: ExerciseCategory,
)