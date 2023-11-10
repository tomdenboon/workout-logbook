package tom.com.monkeylog.service

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.monkeylog.dto.program.ProgramCreateRequest
import tom.com.monkeylog.dto.program.ProgramUpdateRequest
import tom.com.monkeylog.dto.program.ProgramWeekCreateRequest
import tom.com.monkeylog.mapper.toEntity
import tom.com.monkeylog.mapper.update
import tom.com.monkeylog.model.workout.Program
import tom.com.monkeylog.model.workout.ProgramWeek
import tom.com.monkeylog.repository.ProgramRepository
import tom.com.monkeylog.repository.ProgramWeekRepository
import tom.com.monkeylog.security.AuthenticatedUser
import java.util.*

@Service
class ProgramService(
    private val programRepository: ProgramRepository,
    private val programWeekRepository: ProgramWeekRepository,
) {
    fun allPrograms() = programRepository.findAllByUserId(AuthenticatedUser.id)

    fun getProgram(id: UUID): Program = programRepository.findById(id)
        .filter(AuthenticatedUser::isResourceOwner)
        .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Program not found") }

    fun createProgram(programCreateRequest: ProgramCreateRequest): Program {
        val program: Program = programCreateRequest.toEntity()
        program.userId = AuthenticatedUser.id
        return programRepository.save(program)
    }

    fun updateProgram(id: UUID, programUpdateRequest: ProgramUpdateRequest) =
        programRepository.save(getProgram(id).update(programUpdateRequest))

    fun deleteProgram(id: UUID) = programRepository.delete(getProgram(id))

    fun getProgramWeek(id: UUID): ProgramWeek = programWeekRepository.findById(id)
        .filter(AuthenticatedUser::isResourceOwner)
        .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Program week not found") }

    fun createProgramWeek(id: UUID, programWeekCreateRequest: ProgramWeekCreateRequest) =
        programWeekRepository.save(programWeekCreateRequest.toEntity(getProgram(id)))

    fun deleteProgramWeek(id: UUID) {
        programWeekRepository.delete(getProgramWeek(id))
    }
}
