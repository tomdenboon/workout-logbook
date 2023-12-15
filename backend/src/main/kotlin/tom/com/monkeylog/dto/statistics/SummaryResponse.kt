package tom.com.monkeylog.dto.statistics

data class SummaryResponse(
    val totalWorkouts: Long,
    val totalTime: Double,
    val totalVolume: Double,
)

