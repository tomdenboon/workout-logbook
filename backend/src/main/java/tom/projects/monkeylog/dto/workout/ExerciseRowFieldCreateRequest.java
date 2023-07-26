package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExerciseRowFieldCreateRequest {
    @NotNull
    private Long exerciseFieldId;
    private String value;
}
