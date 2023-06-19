package tom.projects.monkeylog.dto.measurement;

import lombok.Data;

import java.util.List;

@Data
public class MeasurementFullResponse {
    private Long id;
    private String name;
    private String unit;
    private List<MeasurementPointResponse> measurementPoints;
}
