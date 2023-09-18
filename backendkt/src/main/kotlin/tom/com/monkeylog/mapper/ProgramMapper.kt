package tom.com.monkeylog.mapper

import org.mapstruct.Mapper
import org.mapstruct.MappingTarget
import org.mapstruct.ReportingPolicy
import tom.com.monkeylog.dto.program.*
import tom.com.monkeylog.model.workout.Program
import tom.com.monkeylog.model.workout.ProgramWeek

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = [WorkoutMapper::class])
interface ProgramMapper {
    fun programToProgramResponse(program: Program): ProgramResponse
    fun programListToProgramResponseList(programList: List<Program>): List<ProgramResponse>
    fun programCreateRequestToProgram(programCreateRequest: ProgramCreateRequest): Program
    fun updateProgram(@MappingTarget program: Program, programUpdateRequest: ProgramUpdateRequest)
    fun programWeekCreateRequestToProgramWeek(programWeekCreateRequest: ProgramWeekCreateRequest): ProgramWeek
    fun programWeekToProgramWeekResponse(programWeek: ProgramWeek): ProgramWeekResponse
}
