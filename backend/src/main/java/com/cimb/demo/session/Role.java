package com.cimb.demo.session;

/**
 * Two roles for the role-based access control demo (SR7).
 * ADMIN may view the Raw Database View and the audit log; CUSTOMER may not.
 */
public enum Role {
    CUSTOMER,
    ADMIN
}
