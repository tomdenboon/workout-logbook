package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import tom.projects.monkeylog.model.workout.WorkoutType;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class WorkoutResponse {
    @NotNull
    private UUID id;
    @NotEmpty
    private String name;
    @NotEmpty
    private String note;
    @NotNull
    private WorkoutType workoutType;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
