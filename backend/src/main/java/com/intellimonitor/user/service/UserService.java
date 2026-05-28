package com.intellimonitor.user.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.intellimonitor.user.dto.UserResponse;
import com.intellimonitor.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    public UserResponse getCurrentUser(
            Authentication authentication
    ) {

        User user = (User) authentication.getPrincipal();

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}