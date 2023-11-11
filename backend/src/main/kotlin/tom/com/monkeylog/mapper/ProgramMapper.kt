package tom.com.monkeylog.mapper

import tom.com.monkeylog.common.notNull
import tom.com.monkeylog.dto.program.*
import tom.com.monkeylog.model.workout.Program
import tom.com.monkeylog.model.workout.ProgramWeek
import tom.com.monkeylog.model.workout.WorkoutType

fun Program.toResponse() = ProgramResponse(
    id = id.notNull(),
    name = name,
    description = description,
    weeks = this.programWeeks.map(ProgramWeek::toResponse)
)

fun ProgramWeek.toResponse() = ProgramWeekResponse(
    id = id.notNull(),
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
