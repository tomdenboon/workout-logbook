package tom.com.workout.logbook.repository

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.workout.logbook.model.workout.Program
import java.util.*

interface ProgramRepository : JpaRepository<Program, UUID> {
    fun findAllByUserId(userId: UUID): List<Program>
}
