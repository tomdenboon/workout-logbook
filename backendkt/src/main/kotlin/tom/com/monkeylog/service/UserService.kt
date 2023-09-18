package tom.com.monkeylog.service

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import tom.com.monkeylog.model.user.User
import tom.com.monkeylog.repository.user.UserRepository
import tom.com.monkeylog.security.AuthenticatedUser

@Service
class UserService(val userRepository: UserRepository) {
    fun getUser(): User {
        return userRepository.findById(AuthenticatedUser.id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "User not found") }
    }
}
