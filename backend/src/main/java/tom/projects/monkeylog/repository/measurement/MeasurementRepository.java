package tom.projects.monkeylog.repository.measurement;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.measurement.Measurement;

import java.util.UUID;

public interface MeasurementRepository extends JpaRepository<Measurement, UUID> {
}
