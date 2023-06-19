package tom.projects.monkeylog.repository.workout;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.workout.ExerciseRow;

public interface ExerciseRowRepository extends JpaRepository<ExerciseRow, Long> {

}
