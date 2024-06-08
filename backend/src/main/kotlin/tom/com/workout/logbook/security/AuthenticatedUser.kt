package tom.com.workout.logbook.security

import tom.com.workout.logbook.model.user.UserOwned
import java.util.*

object AuthenticatedUser {
    val id: UUID = UUID.fromString("00000000-0000-0000-0000-000000000000")


    fun isResourceOwner(resource: UserOwned): Boolean {
        return resource.userId == id
    }

    fun isOwnerOrNull(resource: UserOwned): Boolean {
        return resource.userId == null || isResourceOwner(resource)
    }

}
