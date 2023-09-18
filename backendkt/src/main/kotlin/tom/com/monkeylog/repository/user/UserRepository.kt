package tom.com.monkeylog.repository.user

import org.springframework.data.jpa.repository.JpaRepository
import tom.com.monkeylog.model.user.User
import java.util.*

interface UserRepository : JpaRepository<User, UUID>
