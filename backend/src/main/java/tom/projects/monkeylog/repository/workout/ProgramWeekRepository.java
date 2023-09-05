package tom.projects.monkeylog.repository.workout;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.workout.ProgramWeek;

import java.util.UUID;

public interface ProgramWeekRepository extends JpaRepository<ProgramWeek, UUID> {
}
