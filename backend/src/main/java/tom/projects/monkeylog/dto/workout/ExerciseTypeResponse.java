package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import tom.projects.monkeylog.model.MetricFormat;
import tom.projects.monkeylog.model.exercise.ExerciseType;

@Data
@Builder
public class ExerciseTypeResponse {
    @NotEmpty
    private ExerciseType id;
    @NotEmpty
    private String name;
    @NotNull
    private MetricFormat metricFormat;
}
