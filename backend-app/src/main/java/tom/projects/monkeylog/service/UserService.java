package tom.projects.monkeylog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tom.projects.monkeylog.model.user.User;
import tom.projects.monkeylog.repository.user.UserRepository;
import tom.projects.monkeylog.security.AuthenticatedUser;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User get() {
        return userRepository.findById(AuthenticatedUser.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}
