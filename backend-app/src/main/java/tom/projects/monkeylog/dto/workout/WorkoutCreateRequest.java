package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class WorkoutCreateRequest {
    @NotBlank
    private String name;
    private Long programWeekId;
}
