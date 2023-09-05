package tom.projects.monkeylog.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.user.User;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
