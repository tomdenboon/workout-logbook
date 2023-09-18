package tom.com.monkeylog.dto.program

data class ProgramResponse(
    val id: String,
    val name: String,
    val description: String,
    val weeks: List<ProgramWeekResponse>
)

