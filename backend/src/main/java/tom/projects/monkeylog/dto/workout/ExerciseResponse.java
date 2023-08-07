package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import tom.projects.monkeylog.model.exercise.Exercise;
import tom.projects.monkeylog.model.exercise.ExerciseCategory;

@Data
public class ExerciseResponse {
    @NotNull
    private Long id;
    @NotBlank
    private String name;
    @NotNull
    private ExerciseCategory exerciseCategory;
}