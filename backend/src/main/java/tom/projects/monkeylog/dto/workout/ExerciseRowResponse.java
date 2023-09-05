package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ExerciseRowResponse {
    @NotNull
    private UUID id;
    @NotNull
    private List<ExerciseRowFieldResponse> exerciseRowFields;
    @NotNull
    private Boolean isLifted;
}
