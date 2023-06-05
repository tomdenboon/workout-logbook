package tom.projects.monkeylog.dto.measurement;

import lombok.Data;

@Data
public class MeasurementUpdateRequest {
    private String name;
    private String unit;
}
