package tom.com.monkeylog.repository

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.monkeylog.model.user.Settings
import java.util.*

interface SettingsRepository : JpaRepository<Settings, UUID> {
    fun findByUserId(userId: UUID): Optional<Settings>
}
