package tom.projects.monkeylog.dto.measurement;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MeasurementPointCreateRequest {
    @NotNull
    private Double value;
}
