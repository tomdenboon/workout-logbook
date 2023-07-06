package tom.projects.monkeylog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tom.projects.monkeylog.dto.program.ProgramCreateRequest;
import tom.projects.monkeylog.dto.program.ProgramUpdateRequest;
import tom.projects.monkeylog.dto.program.ProgramWeekCreateRequest;
import tom.projects.monkeylog.mapper.ProgramMapper;
import tom.projects.monkeylog.model.workout.Program;
import tom.projects.monkeylog.model.workout.ProgramWeek;
import tom.projects.monkeylog.model.workout.Type;
import tom.projects.monkeylog.repository.workout.ProgramRepository;
import tom.projects.monkeylog.repository.workout.ProgramWeekRepository;
import tom.projects.monkeylog.security.AuthenticatedUser;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgramService {
    private final ProgramRepository programRepository;
    private final ProgramWeekRepository programWeekRepository;
    private final ProgramMapper programMapper;

    public List<Program> allPrograms() {
        return programRepository.findAllByUserId(AuthenticatedUser.getId());
    }

    public Program getProgram(Long id) {
        return programRepository.findById(id)
                .filter(AuthenticatedUser::isResourceOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Program not found"));
    }

    public Program createProgram(ProgramCreateRequest programCreateRequest) {
        Program program = programMapper.programCreateRequestToProgram(programCreateRequest);
        program.setUserId(AuthenticatedUser.getId());
        program.setType(Type.TEMPLATE);
        return programRepository.save(program);
    }

    public Program updateProgram(Long id, ProgramUpdateRequest programUpdateRequest) {
        Program program = getProgram(id);
        programMapper.updateProgram(program, programUpdateRequest);

        return programRepository.save(program);
    }

    public void deleteProgram(Long id) {
        programRepository.delete(getProgram(id));
    }

    public ProgramWeek getProgramWeek(Long id) {
        return programWeekRepository.findById(id)
                .filter(AuthenticatedUser::isResourceOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Program week not found"));
    }

    public ProgramWeek createProgramWeek(Long id, ProgramWeekCreateRequest programWeekCreateRequest) {
        Program program = getProgram(id);
        ProgramWeek programWeek = programMapper.programWeekCreateRequestToProgramWeek(programWeekCreateRequest);
        programWeek.setProgram(program);

        return programWeekRepository.save(programWeek);
    }

    public void deleteProgramWeek(Long id) {
        programWeekRepository.delete(getProgramWeek(id));
    }
}
