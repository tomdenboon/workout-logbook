package tom.com.monkeylog.mapper

import tom.com.monkeylog.common.notNull
import tom.com.monkeylog.dto.settings.SettingsResponse
import tom.com.monkeylog.dto.settings.SettingsUpdateRequest
import tom.com.monkeylog.model.user.Settings

fun Settings.toResponse() = SettingsResponse(
    id = id.notNull(),
    measurementSystem = measurementSystem,
)

fun Settings.update(settingsUpdateRequest: SettingsUpdateRequest): Settings {
    measurementSystem = settingsUpdateRequest.measurementSystem;

    return this
}
