package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExerciseRowUpdateRequest {
    @NotNull
    private Boolean isLifted;
}