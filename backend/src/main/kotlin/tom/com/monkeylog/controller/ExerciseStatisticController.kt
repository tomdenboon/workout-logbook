package tom.com.monkeylog.controller

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
import tom.com.monkeylog.dto.statistics.Aggregate
import tom.com.monkeylog.dto.statistics.StatisticsResponse
import tom.com.monkeylog.dto.statistics.StatisticsType
import tom.com.monkeylog.repository.StatisticsRepository
import tom.com.monkeylog.security.AuthenticatedUser
import java.util.*


@RestController
@Tag(name = "Statistics")
class ExerciseStatisticController(private val statisticsRepository: StatisticsRepository) {
    @GetMapping("/statistics")
    fun getWorkoutStatistics() {
    }

    @GetMapping("/exercises/{id}/statistics")
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
