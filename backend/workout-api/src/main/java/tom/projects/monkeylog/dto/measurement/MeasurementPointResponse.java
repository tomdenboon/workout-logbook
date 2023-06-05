package tom.projects.monkeylog.dto.measurement;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MeasurementPointResponse {
    private Long id;
    private Integer value;
    private LocalDateTime createdAt;
}
