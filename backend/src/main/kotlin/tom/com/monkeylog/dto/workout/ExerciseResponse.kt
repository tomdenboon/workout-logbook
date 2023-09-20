package tom.com.monkeylog.dto.workout

import java.util.*

data class ExerciseResponse(
    val id: UUID,
    val name: String,
    val exerciseCategory: ExerciseCategoryResponse,
)