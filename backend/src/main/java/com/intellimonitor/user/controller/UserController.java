package com.intellimonitor.user.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.intellimonitor.user.dto.UserResponse;
import com.intellimonitor.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public UserResponse getCurrentUser(
            Authentication authentication
    ) {

        return userService.getCurrentUser(authentication);
    }
}