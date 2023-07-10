package tom.projects.monkeylog.model.measurement;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import tom.projects.monkeylog.model.user.UserOwned;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeasurementPoint implements UserOwned {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer value;

    @ManyToOne
    @JoinColumn(name = "measurement_id", nullable = false)
    private Measurement measurement;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Override
    public Long getUserId() {
        return getMeasurement().getUserId();
    }
}