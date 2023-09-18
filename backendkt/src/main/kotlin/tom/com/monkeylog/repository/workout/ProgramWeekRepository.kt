package tom.com.monkeylog.repository.workout

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.monkeylog.model.workout.ProgramWeek
import java.util.*

interface ProgramWeekRepository : JpaRepository<ProgramWeek, UUID>
