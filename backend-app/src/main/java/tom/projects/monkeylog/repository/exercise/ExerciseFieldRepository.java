package tom.projects.monkeylog.repository.exercise;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.exercise.ExerciseField;

public interface ExerciseFieldRepository extends JpaRepository<ExerciseField, Long> {
}