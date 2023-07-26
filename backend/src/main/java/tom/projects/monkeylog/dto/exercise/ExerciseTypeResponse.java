package tom.projects.monkeylog.dto.exercise;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ExerciseTypeResponse {
    @NotNull
    private Long id;
    @NotNull
    private String name;
    @NotEmpty
    private List<ExerciseFieldResponse> exerciseFields;
}
