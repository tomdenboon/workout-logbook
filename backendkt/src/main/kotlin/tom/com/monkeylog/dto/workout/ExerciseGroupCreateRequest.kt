package tom.com.monkeylog.dto.workout

import java.util.*

data class ExerciseGroupCreateRequest(val exerciseIds: Set<UUID>)
