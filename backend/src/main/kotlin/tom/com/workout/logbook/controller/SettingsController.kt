package tom.com.workout.logbook.controller

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
import tom.com.workout.logbook.dto.settings.SettingsResponse
import tom.com.workout.logbook.dto.settings.SettingsUpdateRequest
import tom.com.workout.logbook.mapper.toResponse
import tom.com.workout.logbook.service.SettingsService

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
