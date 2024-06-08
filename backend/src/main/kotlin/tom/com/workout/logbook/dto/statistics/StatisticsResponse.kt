package tom.com.workout.logbook.dto.statistics

import tom.com.workout.logbook.dto.workout.ExerciseRowResponse
import java.time.Instant

data class StatisticsResponse(
    val date: Instant,
    val value: Double,
    val exerciseRow: tom.com.workout.logbook.dto.workout.ExerciseRowResponse? = null
)
