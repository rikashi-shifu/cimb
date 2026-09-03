package com.cimb.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * CIMB Clicks Security Demonstration Prototype.
 *
 * Academic prototype for a Software Security and Safety assignment.
 * Demonstrates four real security vulnerabilities and their fixes, each
 * toggleable at runtime through a global "Secure Mode" switch:
 *
 * Module 1 - Authentication CWE-20 (SR2) Module 2 - Payment authorization
 * CWE-287 (SR3) Module 3 - Duplicate transfer guard CWE-675 (SR5) Module 4 -
 * Encryption at rest CWE-311 (SR1/SR6)
 *
 * Shared panels: append-only hash-chained audit log (SR5) and role-based access
 * (SR7).
 */
@SpringBootApplication
public class CimbDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(CimbDemoApplication.class, args);
    }
}
