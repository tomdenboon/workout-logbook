package tom.com.workout.logbook.mapper

import tom.com.workout.logbook.dto.program.*
import tom.com.workout.logbook.model.workout.Program
import tom.com.workout.logbook.model.workout.ProgramWeek
import tom.com.workout.logbook.model.workout.WorkoutType

fun Program.toResponse() = ProgramResponse(
    id = id!!,
    name = name,
    description = description,
    weeks = this.programWeeks.map(ProgramWeek::toResponse)
)

fun ProgramWeek.toResponse() = ProgramWeekResponse(
    id = id!!,
    name = name,
)

fun ProgramCreateRequest.toEntity() = Program(
    name = name,
    description = description,
    workoutType = WorkoutType.TEMPLATE
)

fun Program.update(programUpdateRequest: ProgramUpdateRequest): Program {
    name = programUpdateRequest.name
    description = programUpdateRequest.description

    return this
}

fun ProgramWeekCreateRequest.toEntity(program: Program) = ProgramWeek(
    name = name,
    program = program
)
