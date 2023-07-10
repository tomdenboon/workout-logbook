package tom.projects.monkeylog.security;

import tom.projects.monkeylog.model.user.UserOwned;

import java.util.Objects;

public class AuthenticatedUser {
    public static Long getId() {
        return 1L;
    }

    public static boolean isResourceOwner(UserOwned resource) {
        return Objects.equals(resource.getUserId(), getId());
    }

    public static boolean isOwnerOrNull(UserOwned resource) {
        return resource.getUserId() == null || isResourceOwner(resource);
    }
}
