package tom.projects.monkeylog.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tom.projects.monkeylog.dto.program.*;
import tom.projects.monkeylog.mapper.ProgramMapper;
import tom.projects.monkeylog.service.ProgramService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProgramController {
    private final ProgramService programService;
    private final ProgramMapper programMapper;

    @GetMapping("/programs")
    List<ProgramResponse> all() {
        return programMapper.programListToProgramResponseList(programService.allPrograms());
    }

    @GetMapping("/programs/{id}")
    ProgramResponse get(@PathVariable Long id) {
        return programMapper.programToProgramResponse(programService.getProgram(id));
    }

    @PostMapping("/programs")
    ProgramResponse create(@RequestBody @Valid ProgramCreateRequest programCreateRequest) {
        return programMapper.programToProgramResponse(programService.createProgram(programCreateRequest));
    }

    @PutMapping("/programs/{id}")
    ProgramResponse update(@PathVariable Long id, @RequestBody @Valid ProgramUpdateRequest programUpdateRequest) {
        return programMapper.programToProgramResponse(programService.updateProgram(id, programUpdateRequest));
    }

    @DeleteMapping("/programs/{id}")
    void delete(@PathVariable Long id) {
        programService.deleteProgram(id);
    }

    @PostMapping("/programs/{id}/program-weeks")
    ProgramWeekResponse createProgramWeek(@PathVariable Long id, @RequestBody @Valid ProgramWeekCreateRequest programWeekCreateRequest) {
        return programMapper.programWeekToProgramWeekResponse(programService.createProgramWeek(id, programWeekCreateRequest));
    }

    @DeleteMapping("/program-weeks/{id}")
    void deleteProgramWeek(@PathVariable Long id) {
        programService.deleteProgramWeek(id);
    }
}
