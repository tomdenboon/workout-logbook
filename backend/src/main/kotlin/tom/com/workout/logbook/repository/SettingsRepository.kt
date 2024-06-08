package tom.com.workout.logbook.repository

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.workout.logbook.model.user.Settings
import java.util.*

interface SettingsRepository : JpaRepository<Settings, UUID> {
    fun findByUserId(userId: UUID): Optional<Settings>
}
