package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import tom.projects.monkeylog.model.workout.Type;

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
    private Type type;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
