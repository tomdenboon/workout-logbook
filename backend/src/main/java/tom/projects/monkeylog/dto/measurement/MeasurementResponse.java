package tom.projects.monkeylog.dto.measurement;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MeasurementResponse {
    @NotNull
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private String unit;
}