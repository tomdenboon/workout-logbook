package tom.com.workout.logbook.controller

import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import tom.com.workout.logbook.dto.program.ProgramCreateRequest
import tom.com.workout.logbook.dto.program.ProgramUpdateRequest
import tom.com.workout.logbook.dto.program.ProgramWeekCreateRequest
import tom.com.workout.logbook.mapper.toResponse
import tom.com.workout.logbook.service.ProgramService
import java.util.*

@RestController
@Tag(name = "Program")
class ProgramController
    (
    private val programService: ProgramService,
) {
    @GetMapping("/programs")
    fun getPrograms() = programService.allPrograms().map { it.toResponse() }

    @GetMapping("/programs/{id}")
    fun getProgram(@PathVariable id: UUID) = programService.getProgram(id).toResponse()

    @PostMapping("/programs")
    fun createProgram(@RequestBody programCreateRequest: @Valid ProgramCreateRequest) =
        programService.createProgram(programCreateRequest).toResponse()

    @PutMapping("/programs/{id}")
    fun updateProgram(
        @PathVariable id: UUID,
        @RequestBody @Valid programUpdateRequest: ProgramUpdateRequest
    ) = programService.updateProgram(id, programUpdateRequest).toResponse()

    @DeleteMapping("/programs/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteProgram(@PathVariable id: UUID) = programService.deleteProgram(id)

    @PostMapping("/programs/{id}/program-weeks")
    fun createProgramWeek(
        @PathVariable id: UUID,
        @Valid @RequestBody programWeekCreateRequest: ProgramWeekCreateRequest
    ) = programService.createProgramWeek(
        id,
        programWeekCreateRequest
    ).toResponse()

    @DeleteMapping("/program-weeks/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteProgramWeek(@PathVariable id: UUID) = programService.deleteProgramWeek(id)
}
