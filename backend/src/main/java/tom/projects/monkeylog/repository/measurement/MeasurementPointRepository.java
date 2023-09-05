package tom.projects.monkeylog.repository.measurement;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.measurement.MeasurementPoint;

import java.util.UUID;

public interface MeasurementPointRepository extends JpaRepository<MeasurementPoint, UUID> {

}
