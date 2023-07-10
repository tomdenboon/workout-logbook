package tom.projects.monkeylog.repository.measurement;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.measurement.MeasurementPoint;

public interface MeasurementPointRepository extends JpaRepository<MeasurementPoint, Long> {

}
