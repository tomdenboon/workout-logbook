package tom.projects.monkeylog.dto.measurement;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class MeasurementResponse {
    @NotNull
    private UUID id;
    @NotNull
    private String name;
    @NotNull
    private String unit;
}