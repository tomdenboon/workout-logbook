package tom.com.workout.logbook.service

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.workout.logbook.dto.settings.SettingsUpdateRequest
import tom.com.workout.logbook.mapper.update
import tom.com.workout.logbook.model.user.Settings
import tom.com.workout.logbook.repository.SettingsRepository
import tom.com.workout.logbook.security.AuthenticatedUser

@Service
class SettingsService(
    private val settingsRepository: SettingsRepository
) {
    fun getSettings(): Settings = settingsRepository.findByUserId(AuthenticatedUser.id)
        .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "User settings not found") }

    fun updateSettings(settingsUpdateRequest: SettingsUpdateRequest): Settings =
        getSettings().update(settingsUpdateRequest).let(settingsRepository::save)
}
