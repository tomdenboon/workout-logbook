package tom.com.workout.logbook.controller

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import tom.com.workout.logbook.dto.workout.WorkoutFullResponse
import tom.com.workout.logbook.mapper.toFullResponse
import tom.com.workout.logbook.service.WorkoutService
import java.util.*

@RestController
@Tag(name = "Workout Folder")
class WorkoutFolderController(
    private val workoutService: WorkoutService,
) {
    @GetMapping("/workout-folders/{id}")
    fun getWorkout(@PathVariable id: UUID): WorkoutFullResponse =
        workoutService.getWorkout(id).toFullResponse()

    @DeleteMapping("/workout-folders/{id}")
    fun deleteWorkoutFolder(@PathVariable id: UUID) {
    }
}
