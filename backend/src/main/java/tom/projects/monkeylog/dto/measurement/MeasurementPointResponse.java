package tom.projects.monkeylog.dto.measurement;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class MeasurementPointResponse {
    @NotNull
    private UUID id;
    @NotNull
    private Double value;
    @NotNull
    private LocalDateTime createdAt;
}
