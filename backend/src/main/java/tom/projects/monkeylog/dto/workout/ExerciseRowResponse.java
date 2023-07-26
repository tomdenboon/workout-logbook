package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ExerciseRowResponse {
    @NotNull
    private Long id;
    @NotNull
    private List<ExerciseRowFieldResponse> exerciseRowFields;
    @NotNull
    private Boolean isLifted;
}
