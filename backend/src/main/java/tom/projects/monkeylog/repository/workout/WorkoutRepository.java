package tom.projects.monkeylog.repository.workout;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.workout.WorkoutType;
import tom.projects.monkeylog.model.workout.Workout;

import java.time.LocalDateTime;
import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findAllByWorkoutTypeAndUserId(WorkoutType workoutType, Long userId);
    Page<Workout> findAllByWorkoutTypeAndUserId(WorkoutType workoutType, Long userId, Pageable pageable);
    Page<Workout> findAllByWorkoutTypeAndUserIdAndStartDateAfter(WorkoutType workoutType, Long userId, LocalDateTime start, Pageable pageable);
}

