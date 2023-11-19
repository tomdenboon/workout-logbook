package tom.com.monkeylog.dto.statistics

import tom.com.monkeylog.dto.workout.ExerciseRowResponse
import java.time.Instant

data class StatisticsResponse(val value: Double, val date: Instant, val exerciseRow: ExerciseRowResponse? = null)
