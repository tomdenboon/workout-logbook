package tom.com.monkeylog.dto.statistics

import tom.com.monkeylog.dto.workout.ExerciseRowResponse
import java.time.Instant

data class StatisticsResponse(
    val date: Instant,
    val value: Double,
    val exerciseRow: ExerciseRowResponse? = null
)
