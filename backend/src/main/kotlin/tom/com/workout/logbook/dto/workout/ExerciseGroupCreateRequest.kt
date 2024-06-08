package tom.com.workout.logbook.dto.workout

import java.util.*

data class ExerciseGroupCreateRequest(val exerciseIds: Set<UUID>)
