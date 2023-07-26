package tom.projects.monkeylog.dto.exercise;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExerciseUpdateRequest {
    @NotNull
    private String name;
}
