package tom.projects.monkeylog.repository.workout;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.workout.ExerciseRowField;

import java.util.UUID;

public interface ExerciseRowFieldRepository extends JpaRepository<ExerciseRowField, UUID> {
}
