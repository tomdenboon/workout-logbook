package tom.com.monkeylog.controller

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
import tom.com.monkeylog.dto.statistics.StatisticsResponse
import tom.com.monkeylog.dto.statistics.StatisticsType
import tom.com.monkeylog.service.StatisticsService
import java.util.*

@RestController
@Tag(name = "Exercise Statistics")
@RequestMapping("/exercise/{id}")
class ExerciseStatisticController(private val statisticsService: StatisticsService) {
    @GetMapping("/statistics")
    fun aggregate(@PathVariable id: UUID, @RequestParam type: StatisticsType): List<StatisticsResponse> {
        return statisticsService.getStatistics(id, type)
    }
}
