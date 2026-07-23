package com.cimb.demo.auth;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cimb.demo.session.SessionService;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;

/**
 * Module 1 — Authentication endpoints (CWE-303 / SR2).
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService auth;
    private final SessionService sessions;

    public AuthController(AuthService auth, SessionService sessions) {
        this.auth = auth;
        this.sessions = sessions;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest req) {
        AuthService.LoginResult result = auth.login(req.username(), req.password());
        HttpStatus status = (result.success() || result.mfaRequired())
                ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        return ResponseEntity.status(status).body(result.toMap());
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody OtpRequest req) {
        AuthService.LoginResult result = auth.verifyOtp(req.challengeId(), req.code());
        HttpStatus status = result.success() ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        return ResponseEntity.status(status).body(result.toMap());
    }

    @GetMapping("/me")
    public Map<String, Object> me(@RequestHeader(value = "X-Session-Token", required = false) String token) {
        var user = sessions.require(token);
        return Map.of(
                "username", user.username(),
                "displayName", user.displayName(),
                "role", user.role().name());
    }

    @PostMapping("/logout")
    public Map<String, Object> logout(@RequestHeader(value = "X-Session-Token", required = false) String token) {
        sessions.invalidate(token);
        return Map.of("ok", true);
    }

    public record LoginRequest(
            @JsonProperty("username") @NotBlank String username,
            @JsonProperty("password") String password) {
    }

    public record OtpRequest(
            @JsonProperty("challengeId") @NotBlank String challengeId,
            @JsonProperty("code") @NotBlank String code) {
    }
}
