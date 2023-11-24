package tom.com.monkeylog.dto.workout

import tom.com.monkeylog.model.exercise.ExerciseCategory
import java.util.*

data class ExerciseResponse(
    val id: UUID,
    val name: String,
    val exerciseCategory: ExerciseCategory,
)