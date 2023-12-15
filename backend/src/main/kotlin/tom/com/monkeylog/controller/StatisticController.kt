package tom.com.monkeylog.controller

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
import tom.com.monkeylog.dto.statistics.Aggregate
import tom.com.monkeylog.dto.statistics.StatisticsResponse
import tom.com.monkeylog.dto.statistics.StatisticsType
import tom.com.monkeylog.dto.statistics.SummaryResponse
import tom.com.monkeylog.repository.StatisticsRepository
import tom.com.monkeylog.security.AuthenticatedUser
import java.util.*


@RestController
@RequestMapping("/statistics")
@Tag(name = "Statistics")
class StatisticController(private val statisticsRepository: StatisticsRepository) {
    @GetMapping("/summary")
    fun getWorkoutStatistics(): SummaryResponse {
        return SummaryResponse(
            totalWorkouts = statisticsRepository.totalWorkoutCountUser(AuthenticatedUser.id),
            totalTime = statisticsRepository.totalTimeUser(AuthenticatedUser.id),
            totalVolume = statisticsRepository.totalVolumeUser(AuthenticatedUser.id)
        )
    }

    @GetMapping("/frequency")
    fun getWorkoutFrequency(): List<StatisticsResponse> {
        return statisticsRepository.weeklyWorkoutCountUser(AuthenticatedUser.id);
    }

    @GetMapping("/exercise/{id}")
    fun getStatistics(
        @PathVariable id: UUID,
        @RequestParam type: StatisticsType,
        @RequestParam aggregate: Aggregate,
        @RequestParam(defaultValue = "false") distinct: Boolean
    ): List<StatisticsResponse> {
        val statistics = when (aggregate) {
            Aggregate.SUM -> statisticsRepository.getSumStatistics(id, AuthenticatedUser.id, type)
            Aggregate.MAX -> statisticsRepository.getMaxStatistics(id, AuthenticatedUser.id, type)
        }

        if (distinct) {
            return helper(statistics)
        }

        return statistics
    }

    private fun helper(statistics: List<StatisticsResponse>): List<StatisticsResponse> {
        var number = Double.MIN_VALUE

        return statistics
            .filter {
                if (it.value >= number) {
                    number = it.value
                    true
                } else {
                    false
                }
            }
    }
}