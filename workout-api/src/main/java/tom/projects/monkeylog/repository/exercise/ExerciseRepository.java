package tom.projects.monkeylog.repository.exercise;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.exercise.Exercise;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findAllByUserId(Long userId);
}
