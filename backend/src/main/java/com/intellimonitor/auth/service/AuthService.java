package com.intellimonitor.auth.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.intellimonitor.auth.dto.AuthResponse;
import com.intellimonitor.auth.dto.LoginRequest;
import com.intellimonitor.auth.dto.RegisterRequest;
import com.intellimonitor.exception.InvalidCredentialsException;
import com.intellimonitor.exception.UserAlreadyExistsException;
import com.intellimonitor.security.JwtService;
import com.intellimonitor.user.entity.User;
import com.intellimonitor.user.enums.Role;
import com.intellimonitor.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {

            throw new UserAlreadyExistsException(
                "Email already exists"
        );
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .message("User registered successfully")
                .build();
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException(
        "Invalid email or password"
));

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!matches) {

            throw new InvalidCredentialsException(
        "Invalid email or password"
);
        }

        String token = jwtService.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .message("Login successful")
                .build();
    }
}