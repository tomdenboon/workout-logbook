package tom.projects.monkeylog.repository.workout;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.workout.Type;
import tom.projects.monkeylog.model.workout.Workout;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findAllByTypeAndUserId(Type type, Long userId);
    Page<Workout> findAllByTypeAndUserId(Type type, Long userId, Pageable pageable);
    Page<Workout> findAllByTypeAndUserIdAndStartDateAfter(Type type, Long userId, LocalDateTime start, Pageable pageable);
}

