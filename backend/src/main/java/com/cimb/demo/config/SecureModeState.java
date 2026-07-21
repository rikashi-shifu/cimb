package com.cimb.demo.config;

import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Global "Secure Mode" switch shared by every module.
 *
 *   OFF (default) = the vulnerable behaviour that reproduces the historical CIMB bug.
 *   ON            = the fixed behaviour with the security control active.
 *
 * Kept intentionally in-memory and process-global so a grader can flip a single toggle
 * in the UI and watch the same action succeed as an attack (OFF) then be blocked (ON).
 */
@Component
public class SecureModeState {

    // Start OFF so demos open on the vulnerable behaviour.
    private final AtomicBoolean secure = new AtomicBoolean(false);

    public boolean isSecure() {
        return secure.get();
    }

    public boolean setSecure(boolean value) {
        secure.set(value);
        return value;
    }

    public synchronized boolean toggle() {
        boolean next = !secure.get();
        secure.set(next);
        return next;
    }
}
