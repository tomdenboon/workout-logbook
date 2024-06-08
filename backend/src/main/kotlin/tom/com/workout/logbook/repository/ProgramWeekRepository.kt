package tom.com.workout.logbook.repository

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.workout.logbook.model.workout.ProgramWeek
import java.util.*

interface ProgramWeekRepository : JpaRepository<ProgramWeek, UUID>
