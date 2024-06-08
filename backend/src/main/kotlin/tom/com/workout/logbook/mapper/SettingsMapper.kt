package tom.com.workout.logbook.mapper

import tom.com.workout.logbook.dto.settings.SettingsResponse
import tom.com.workout.logbook.dto.settings.SettingsUpdateRequest
import tom.com.workout.logbook.model.user.Settings

fun Settings.toResponse() = SettingsResponse(
    id = id!!,
    measurementSystem = measurementSystem,
)

fun Settings.update(settingsUpdateRequest: SettingsUpdateRequest): Settings {
    measurementSystem = settingsUpdateRequest.measurementSystem;

    return this
}
