package tom.projects.monkeylog.dto.measurement;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MeasurementPointResponse {
    @NotNull
    private Long id;
    @NotNull
    private Double value;
    @NotNull
    private LocalDateTime createdAt;
}
