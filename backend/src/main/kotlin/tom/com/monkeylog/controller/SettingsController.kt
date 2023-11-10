package tom.com.monkeylog.controller

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
import tom.com.monkeylog.dto.settings.SettingsResponse
import tom.com.monkeylog.dto.settings.SettingsUpdateRequest
import tom.com.monkeylog.mapper.toResponse
import tom.com.monkeylog.service.SettingsService
import java.util.*

@RestController
@Tag(name = "Settings")
class SettingsController(
    private val settingsService: SettingsService,
) {
    @GetMapping("/settings")
    fun getSettings(): SettingsResponse = settingsService.getSettings().toResponse()

    @PutMapping("/settings")
    fun updateSettings(@RequestBody settingsUpdateRequest: SettingsUpdateRequest): SettingsResponse =
        settingsService.updateSettings(settingsUpdateRequest).toResponse()
}
