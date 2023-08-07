package tom.projects.monkeylog.dto.workout;

import lombok.Builder;
import lombok.Data;
import tom.projects.monkeylog.model.MetricFormat;

@Data
@Builder
public class ExerciseTypeResponse {
    private String name;
    private MetricFormat metricFormat;
}
