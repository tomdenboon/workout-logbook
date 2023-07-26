package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import tom.projects.monkeylog.dto.exercise.ExerciseResponse;

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
