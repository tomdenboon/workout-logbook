package tom.projects.monkeylog.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tom.projects.monkeylog.dto.program.*;
import tom.projects.monkeylog.mapper.ProgramMapper;
import tom.projects.monkeylog.service.ProgramService;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Tag(name = "Program")
public class ProgramController {
    private final ProgramService programService;
    private final ProgramMapper programMapper;

    @GetMapping("/programs")
    List<ProgramResponse> getPrograms() {
        return programMapper.programListToProgramResponseList(programService.allPrograms());
    }

    @GetMapping("/programs/{id}")
    ProgramResponse getProgram(@PathVariable UUID id) {
        return programMapper.programToProgramResponse(programService.getProgram(id));
    }

    @PostMapping("/programs")
    ProgramResponse createProgram(@RequestBody @Valid ProgramCreateRequest programCreateRequest) {
        return programMapper.programToProgramResponse(programService.createProgram(programCreateRequest));
    }

    @PutMapping("/programs/{id}")
    ProgramResponse updateProgram(@PathVariable UUID id, @RequestBody @Valid ProgramUpdateRequest programUpdateRequest) {
        return programMapper.programToProgramResponse(programService.updateProgram(id, programUpdateRequest));
    }

    @DeleteMapping("/programs/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteProgram(@PathVariable UUID id) {
        programService.deleteProgram(id);
    }

    @PostMapping("/programs/{id}/program-weeks")
    ProgramWeekResponse createProgramWeek(@PathVariable UUID id, @RequestBody @Valid ProgramWeekCreateRequest programWeekCreateRequest) {
        return programMapper.programWeekToProgramWeekResponse(programService.createProgramWeek(id, programWeekCreateRequest));
    }

    @DeleteMapping("/program-weeks/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteProgramWeek(@PathVariable UUID id) {
        programService.deleteProgramWeek(id);
    }
}
