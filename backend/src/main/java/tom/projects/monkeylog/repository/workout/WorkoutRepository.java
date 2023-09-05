package tom.projects.monkeylog.repository.workout;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.workout.Workout;
import tom.projects.monkeylog.model.workout.WorkoutType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface WorkoutRepository extends JpaRepository<Workout, UUID> {
    List<Workout> findAllByWorkoutTypeAndUserId(WorkoutType workoutType, UUID userId);

    Page<Workout> findAllByWorkoutTypeAndUserId(WorkoutType workoutType, UUID userId, Pageable pageable);

    Page<Workout> findAllByWorkoutTypeAndUserIdAndStartDateAfter(WorkoutType workoutType, UUID userId, LocalDateTime start, Pageable pageable);
}

