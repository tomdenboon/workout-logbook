package tom.projects.monkeylog.dto.exercise;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExerciseFieldResponse {
    @NotNull
    private Long id;
    @NotNull
    private String type;
}
