package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ExerciseGroupResponse {
    @NotNull
    private Long id;
    @NotNull
    private ExerciseResponse exercise;
    @NotNull
    private List<ExerciseRowResponse> exerciseRows;
}
