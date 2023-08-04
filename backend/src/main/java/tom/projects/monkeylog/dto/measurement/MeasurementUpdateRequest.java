package tom.projects.monkeylog.dto.measurement;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import tom.projects.monkeylog.model.MetricFormat;

@Data
public class MeasurementUpdateRequest {
    @NotBlank
    private String name;
    @NotBlank
    private MetricFormat metricFormat;
}
