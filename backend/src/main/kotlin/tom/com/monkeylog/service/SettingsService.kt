package tom.com.monkeylog.service

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.monkeylog.dto.settings.SettingsUpdateRequest
import tom.com.monkeylog.mapper.update
import tom.com.monkeylog.model.user.Settings
import tom.com.monkeylog.repository.SettingsRepository
import tom.com.monkeylog.security.AuthenticatedUser

@Service
class SettingsService(
    private val settingsRepository: SettingsRepository
) {
    fun getSettings(): Settings = settingsRepository.findByUserId(AuthenticatedUser.id)
        .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "User settings not found") }

    fun updateSettings(settingsUpdateRequest: SettingsUpdateRequest): Settings =
        getSettings().update(settingsUpdateRequest).let(settingsRepository::save)
}
