package tom.projects.monkeylog.model.measurement;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UuidGenerator;
import tom.projects.monkeylog.model.user.UserOwned;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeasurementPoint implements UserOwned {
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    private Double value;

    @ManyToOne
    @JoinColumn(name = "measurement_id", nullable = false)
    private Measurement measurement;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Override
    public UUID getUserId() {
        return getMeasurement().getUserId();
    }
}