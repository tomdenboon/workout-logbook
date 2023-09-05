package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

@Data
public class WorkoutCreateRequest {
    @NotBlank
    private String name;
    private UUID programWeekId;
}
