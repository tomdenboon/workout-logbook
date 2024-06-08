package tom.com.workout.logbook.dto.statistics

data class SummaryResponse(
    val totalWorkouts: Long,
    val totalTime: Double,
    val totalVolume: Double,
)

