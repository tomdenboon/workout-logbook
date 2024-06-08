package tom.com.workout.logbook.dto.settings

import tom.com.workout.logbook.model.user.MeasurementSystem
import java.util.*

data class SettingsResponse(val id: UUID, val measurementSystem: MeasurementSystem)