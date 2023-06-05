package tom.projects.monkeylog.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.projects.monkeylog.model.user.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
