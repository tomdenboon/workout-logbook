package tom.com.workout.logbook.repository

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.workout.logbook.model.user.User
import java.util.*

interface UserRepository : JpaRepository<User, UUID>
