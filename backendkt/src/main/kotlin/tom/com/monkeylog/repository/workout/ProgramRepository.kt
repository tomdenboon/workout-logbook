package tom.com.monkeylog.repository.workout

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.monkeylog.model.workout.Program
import java.util.*

interface ProgramRepository : JpaRepository<Program, UUID> {
    fun findAllByUserId(userId: UUID): List<Program>
}
