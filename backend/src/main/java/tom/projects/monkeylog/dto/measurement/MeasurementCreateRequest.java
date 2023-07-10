package tom.projects.monkeylog.dto.measurement;

import lombok.Data;

@Data
public class MeasurementCreateRequest {
    private String name;
    private String unit;
}
