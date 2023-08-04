package tom.projects.monkeylog.model.measurement;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import tom.projects.monkeylog.model.MetricFormat;
import tom.projects.monkeylog.model.user.UserOwned;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Measurement implements UserOwned {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Long userId;
    @Enumerated(EnumType.STRING)
    private MetricFormat metric;
    @OneToMany(mappedBy = "measurement")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<MeasurementPoint> measurementPoints;
}
