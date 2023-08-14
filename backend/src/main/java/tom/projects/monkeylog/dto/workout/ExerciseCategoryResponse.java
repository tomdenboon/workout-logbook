package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import tom.projects.monkeylog.model.exercise.ExerciseCategory;

import java.util.List;

@Data
@Builder
public class ExerciseCategoryResponse {
    @NotEmpty
    private ExerciseCategory id;
    @NotEmpty
    private String name;
    @NotNull
    private List<ExerciseTypeResponse> exerciseTypes;
}
