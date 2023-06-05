package tom.projects.monkeylog.repository.workout;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.workout.ExerciseGroup;

public interface ExerciseGroupRepository extends JpaRepository<ExerciseGroup, Long> {
}
