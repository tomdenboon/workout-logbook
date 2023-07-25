package tom.projects.monkeylog.dto.measurement;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MeasurementPointUpdateRequest {
    @NotBlank
    private Double value;
}