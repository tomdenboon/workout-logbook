package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ExerciseGroupResponse {
    @NotNull
    private UUID id;
    @NotNull
    private ExerciseResponse exercise;
    @NotNull
    private List<ExerciseRowResponse> exerciseRows;
}
