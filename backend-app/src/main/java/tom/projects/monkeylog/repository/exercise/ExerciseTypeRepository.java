package tom.projects.monkeylog.repository.exercise;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.exercise.ExerciseType;

public interface ExerciseTypeRepository extends JpaRepository<ExerciseType, Long> {
}
