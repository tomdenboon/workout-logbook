package tom.com.monkeylog.controller

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
import tom.com.monkeylog.dto.statistics.*
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
    fun getWorkoutFrequency(@RequestParam interval: Interval): List<StatisticsResponse> {
        return statisticsRepository.workoutCountUser(AuthenticatedUser.id, interval);
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
            var number = Double.MIN_VALUE

            return statistics.filter {
                val isGreater = it.value >= number
                if (isGreater) number = it.value
                isGreater
            }
        }

        return statistics
    }
}