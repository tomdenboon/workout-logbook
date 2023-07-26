package tom.projects.monkeylog.dto.measurement;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class MeasurementFullResponse {
    @NotNull
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private String unit;
    @NotNull
    private List<MeasurementPointResponse> measurementPoints;
}
