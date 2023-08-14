package tom.projects.monkeylog.dto.measurement;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import tom.projects.monkeylog.model.MetricFormat;

@Data
public class MeasurementCreateRequest {
    @NotBlank
    private String name;
    @NotNull
    private MetricFormat metricFormat;
}
