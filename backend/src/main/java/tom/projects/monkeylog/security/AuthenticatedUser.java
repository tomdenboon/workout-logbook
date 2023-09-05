package tom.projects.monkeylog.security;

import tom.projects.monkeylog.model.user.UserOwned;

import java.util.Objects;
import java.util.UUID;

public class AuthenticatedUser {
    public static UUID getId() {
        return UUID.fromString("00000000-0000-0000-0000-000000000000");
    }

    public static boolean isResourceOwner(UserOwned resource) {
        return Objects.equals(resource.getUserId(), getId());
    }

    public static boolean isOwnerOrNull(UserOwned resource) {
        return resource.getUserId() == null || isResourceOwner(resource);
    }
}
