package tom.projects.monkeylog.dto.measurement;

import lombok.Data;

@Data
public class MeasurementResponse {
    private Long id;
    private String name;
    private String unit;
}