package com.rbac.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Tag(name = "Content", description = "Role-based content endpoints")
public class ContentController {

    @GetMapping("/api/public")
    @Operation(summary = "Public endpoint - accessible by anyone")
    public ResponseEntity<Map<String, String>> publicEndpoint() {
        return ResponseEntity.ok(Map.of(
            "message", "This is public content. Anyone can see this!",
            "access", "PUBLIC"
        ));
    }

    @GetMapping("/api/user")
    @Operation(summary = "User endpoint - requires USER or ADMIN role",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Map<String, String>> userEndpoint(Authentication auth) {
        return ResponseEntity.ok(Map.of(
            "message", "Welcome, " + auth.getName() + "! This is user-level content.",
            "access", "USER"
        ));
    }

    @GetMapping("/api/admin")
    @Operation(summary = "Admin endpoint - requires ADMIN role only",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Map<String, String>> adminEndpoint(Authentication auth) {
        return ResponseEntity.ok(Map.of(
            "message", "Hello Admin " + auth.getName() + "! You have full access.",
            "access", "ADMIN"
        ));
    }
}
