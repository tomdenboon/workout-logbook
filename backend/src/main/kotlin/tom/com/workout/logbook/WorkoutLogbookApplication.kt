package tom.com.workout.logbook

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class WorkoutLogbookApplication

fun main(args: Array<String>) {
    runApplication<WorkoutLogbookApplication>(*args)
}
