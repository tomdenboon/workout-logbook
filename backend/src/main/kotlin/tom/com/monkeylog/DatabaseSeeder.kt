package tom.com.monkeylog

import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component
import tom.com.monkeylog.model.MetricFormat
import tom.com.monkeylog.model.exercise.Exercise
import tom.com.monkeylog.model.exercise.ExerciseCategory
import tom.com.monkeylog.model.measurement.Measurement
import tom.com.monkeylog.model.measurement.MeasurementPoint
import tom.com.monkeylog.model.workout.ExerciseGroup
import tom.com.monkeylog.model.workout.ExerciseRow
import tom.com.monkeylog.model.workout.Workout
import tom.com.monkeylog.model.workout.WorkoutType
import tom.com.monkeylog.repository.ExerciseRepository
import tom.com.monkeylog.repository.MeasurementRepository
import tom.com.monkeylog.repository.UserRepository
import tom.com.monkeylog.repository.WorkoutRepository
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.*
import kotlin.random.Random

@Component
class DatabaseSeeder(
    private val userRepository: UserRepository,
    private val exerciseRepository: ExerciseRepository,
    private val workoutRepository: WorkoutRepository,
    private val measurementRepository: MeasurementRepository
) {
    @EventListener
    fun seed(event: ContextRefreshedEvent?) {
        val id = UUID.fromString("00000000-0000-0000-0000-000000000000")
        seedExercisesTable(id)
        seedMeasurementsTable(id)

//        List(100) { seedExercisesTable(UUID.randomUUID()) }
    }

    private fun seedExercisesTable(userId: UUID) {
        val exercises = listOf(
            Exercise(
                name = "Bench Press",
                exerciseCategory = ExerciseCategory.WEIGHTED,
                userId = userId
            ),
            Exercise(
                name = "Squat",
                exerciseCategory = ExerciseCategory.WEIGHTED,
                userId = userId
            ),
            Exercise(
                name = "Deadlift",
                exerciseCategory = ExerciseCategory.WEIGHTED,
                userId = userId
            ),
            Exercise(
                name = "Pull Up",
                exerciseCategory = ExerciseCategory.REPS,
                userId = userId
            ),
            Exercise(
                name = "Push Up",
                exerciseCategory = ExerciseCategory.REPS,
                userId = userId
            ),
            Exercise(
                name = "Lateral raises",
                exerciseCategory = ExerciseCategory.WEIGHTED,
                userId = userId
            )
        )

        seedWorkoutTable(userId, exerciseRepository.saveAll(exercises))
    }

    private fun seedWorkoutTable(user: UUID, exercises: List<Exercise>) {
        val multipleWorkouts = List(400) { createWorkout(user, exercises) }

        workoutRepository.saveAll(multipleWorkouts)
    }

    private fun createWorkout(user: UUID, exercises: List<Exercise>): Workout {
        val startDate = generateRandomDateBetween(Instant.now().minus(700, ChronoUnit.DAYS), Instant.now())
        val endDate =
            generateRandomDateBetween(startDate.plus(30, ChronoUnit.MINUTES), startDate.plus(2, ChronoUnit.HOURS))

        return Workout(
            userId = user,
            name = "Workout",
            note = "Test note",
            workoutType = WorkoutType.COMPLETED,
            startDate = startDate,
            endDate = endDate,
        ).apply {
            exerciseGroups = exercises.map { exercise ->
                ExerciseGroup(
                    workout = this,
                    exercise = exercise,
                    userId = user
                ).apply {
                    exerciseRows = MutableList(5) {
                        ExerciseRow(
                            lifted = true,
                            userId = user,
                            exerciseGroup = this,
                            weight = Random.nextInt(1, 100).toDouble(),
                            distance = Random.nextDouble(1.0, 100.0),
                            reps = Random.nextInt(1, 20),
                            time = Random.nextInt(1, 100)
                        )
                    }
                }
            }.toMutableList()
        }
    }

    private fun generateRandomDateBetween(start: Instant, end: Instant): Instant {
        val startEpochSecond = start.epochSecond
        val endEpochSecond = end.epochSecond
        val randomEpochSecond = Random.nextLong(startEpochSecond, endEpochSecond)
        return Instant.ofEpochSecond(randomEpochSecond)
    }

    private fun seedMeasurementsTable(userId: UUID) {
        measurementRepository.saveAll(List(10) { createMeasurement(it, userId) })
    }

    private fun createMeasurement(index: Int, userId: UUID): Measurement {
        measurementRepository.deleteAll()

        return Measurement(
            name = "Measurement $index",
            metric = MetricFormat.values().random(),
            userId = userId,
        ).apply {
            measurementPoints =
                List(100) {
                    MeasurementPoint(
                        measurement = this,
                        value = Random.nextDouble(0.0, 100.0),
                        userId = userId,
                        createdAt = generateRandomDateBetween(Instant.now().minus(365, ChronoUnit.DAYS), Instant.now())
                    )
                }
        }
    }
}
