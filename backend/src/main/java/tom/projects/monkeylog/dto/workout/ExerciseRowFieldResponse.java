package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import tom.projects.monkeylog.dto.exercise.ExerciseFieldResponse;

@Data
public class ExerciseRowFieldResponse {
    @NotNull
    private Long id;
    private String value;
    @NotNull
    private ExerciseFieldResponse exerciseField;
}
