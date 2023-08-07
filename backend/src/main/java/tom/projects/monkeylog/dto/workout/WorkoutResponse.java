package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import tom.projects.monkeylog.model.workout.WorkoutType;

import java.time.LocalDateTime;

@Data
public class WorkoutResponse {
    @NotNull
    private Long id;
    @NotEmpty
    private String name;
    @NotEmpty
    private String note;
    @NotNull
    private WorkoutType workoutType;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
