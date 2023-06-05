package tom.projects.monkeylog.repository.workout;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.workout.ExerciseRowField;

public interface ExerciseRowFieldRepository extends JpaRepository<ExerciseRowField, Long> {
}
