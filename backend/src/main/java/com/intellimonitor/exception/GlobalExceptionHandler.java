package com.intellimonitor.exception;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ExceptionResponse>
    handleUserAlreadyExistsException(
            UserAlreadyExistsException ex
    ) {

        ExceptionResponse response =
                ExceptionResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(ex.getMessage())
                        .build();

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ExceptionResponse>
    handleInvalidCredentialsException(
            InvalidCredentialsException ex
    ) {

        ExceptionResponse response =
                ExceptionResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.UNAUTHORIZED.value())
                        .message(ex.getMessage())
                        .build();

        return new ResponseEntity<>(
                response,
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse>
    handleGenericException(
            Exception ex
    ) {

        ExceptionResponse response =
                ExceptionResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .message(ex.getMessage())
                        .build();

        return new ResponseEntity<>(
                response,
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ExceptionResponse>
handleValidationException(
        MethodArgumentNotValidException ex
) {

    String errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> error.getDefaultMessage())
            .collect(Collectors.joining(", "));

    ExceptionResponse response =
            ExceptionResponse.builder()
                    .timestamp(LocalDateTime.now())
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message(errors)
                    .build();

    return new ResponseEntity<>(
            response,
            HttpStatus.BAD_REQUEST
    );
}
}