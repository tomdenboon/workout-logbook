package tom.projects.monkeylog.repository.workout;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.workout.Workout;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findAllByTypeAndUserId(Workout.Type type, Long userId);

    Optional<Workout> findByIdAndType(Long id, Workout.Type type);

    List<Workout> findByEndDateBetween(LocalDateTime start, LocalDateTime end);
}
