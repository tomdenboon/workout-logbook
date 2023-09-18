package tom.com.monkeylog.service

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.monkeylog.dto.program.ProgramCreateRequest
import tom.com.monkeylog.dto.program.ProgramUpdateRequest
import tom.com.monkeylog.dto.program.ProgramWeekCreateRequest
import tom.com.monkeylog.mapper.ProgramMapper
import tom.com.monkeylog.model.workout.Program
import tom.com.monkeylog.model.workout.ProgramWeek
import tom.com.monkeylog.repository.workout.ProgramRepository
import tom.com.monkeylog.repository.workout.ProgramWeekRepository
import tom.com.monkeylog.security.AuthenticatedUser
import java.util.*

@Service
class ProgramService(
    private val programRepository: ProgramRepository,
    private val programWeekRepository: ProgramWeekRepository,
    private val programMapper: ProgramMapper
) {
    fun allPrograms(): List<Program> {
        return programRepository.findAllByUserId(AuthenticatedUser.id)
    }

    fun getProgram(id: UUID): Program {
        return programRepository.findById(id)
            .filter(AuthenticatedUser::isResourceOwner)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Program not found") }
    }

    fun createProgram(programCreateRequest: ProgramCreateRequest): Program {
        val program: Program = programMapper.programCreateRequestToProgram(programCreateRequest)
        program.userId = AuthenticatedUser.id
        return programRepository.save(program)
    }

    fun updateProgram(id: UUID, programUpdateRequest: ProgramUpdateRequest): Program {
        val program: Program = getProgram(id)
        programMapper.updateProgram(program, programUpdateRequest)
        return programRepository.save(program)
    }

    fun deleteProgram(id: UUID) {
        programRepository.delete(getProgram(id))
    }

    fun getProgramWeek(id: UUID): ProgramWeek {
        return programWeekRepository.findById(id)
            .filter(AuthenticatedUser::isResourceOwner)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Program week not found") }
    }

    fun createProgramWeek(id: UUID, programWeekCreateRequest: ProgramWeekCreateRequest): ProgramWeek {
        val programWeek: ProgramWeek = programMapper.programWeekCreateRequestToProgramWeek(programWeekCreateRequest)
        programWeek.program = getProgram(id)
        return programWeekRepository.save(programWeek)
    }

    fun deleteProgramWeek(id: UUID) {
        programWeekRepository.delete(getProgramWeek(id))
    }
}
