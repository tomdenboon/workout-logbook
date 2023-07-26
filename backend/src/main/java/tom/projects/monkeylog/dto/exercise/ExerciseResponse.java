package tom.projects.monkeylog.dto.exercise;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExerciseResponse {
    @NotNull
    private Long id;
    @NotBlank
    private String name;
    @NotNull
    private ExerciseTypeResponse exerciseType;
}