package tom.com.workout.logbook.dto.program

import java.util.*

data class ProgramResponse(
    val id: UUID,
    val name: String,
    val description: String,
    val weeks: List<ProgramWeekResponse>
)

