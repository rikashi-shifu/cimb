package com.cimb.demo.session;

/** The authenticated principal resolved from a session token. */
public record CurrentUser(String username, String displayName, Role role) {
    public boolean isAdmin() {
        return role == Role.ADMIN;
    }
}
