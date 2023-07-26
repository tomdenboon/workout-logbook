package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class WorkoutCreateRequest {
    @NotBlank
    private String name;
    private Long programWeekId;
}
