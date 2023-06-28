package tom.projects.monkeylog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tom.projects.monkeylog.model.workout.Program;
import tom.projects.monkeylog.repository.workout.ProgramRepository;
import tom.projects.monkeylog.security.AuthenticatedUser;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgramService {
    private final ProgramRepository programRepository;

    public List<Program> all() {
        return programRepository.findAllByUserIdAndTemplateIsTrue(AuthenticatedUser.getId());
    }

    public Program get(Long id) {
        return programRepository.findById(id)
                .filter(AuthenticatedUser::isOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Program not found"));
    }

    public Program create(Long id) {
        return programRepository.findById(id)
                .filter(AuthenticatedUser::isOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Program not found"));
    }

    public Program start(Long id) {
        return programRepository.findById(id)
                .filter(AuthenticatedUser::isOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Program not found"));
    }
}
