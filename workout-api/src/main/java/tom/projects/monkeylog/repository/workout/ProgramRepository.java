package tom.projects.monkeylog.repository.workout;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.workout.Program;

import java.util.List;

public interface ProgramRepository extends JpaRepository<Program, Long> {
    List<Program> findAllByUserId(Long userId);

}
