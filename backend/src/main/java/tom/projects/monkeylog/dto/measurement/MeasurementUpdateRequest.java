package tom.projects.monkeylog.dto.measurement;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MeasurementUpdateRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String unit;
}
