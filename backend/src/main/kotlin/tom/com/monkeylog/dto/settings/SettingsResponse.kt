package tom.com.monkeylog.dto.settings

import tom.com.monkeylog.model.user.MeasurementSystem
import java.util.*

data class SettingsResponse(val id: UUID, val measurementSystem: MeasurementSystem)