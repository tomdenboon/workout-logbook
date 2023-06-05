package tom.projects.monkeylog.dto.workout;

import lombok.Data;
import tom.projects.monkeylog.model.workout.Workout;

import java.time.LocalDateTime;

@Data
public class WorkoutResponse {
    private Long id;

    private String name;

    private String note;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Workout.Type type;
}
