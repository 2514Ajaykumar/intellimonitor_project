package com.intellimonitor.monitor.dto;

import com.intellimonitor.monitor.enums.HttpMethod;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateMonitorRequest {

    @NotBlank(message = "Monitor name is required")
    private String name;

    @NotBlank(message = "URL is required")
    private String url;

    private HttpMethod method;

    private Integer intervalSeconds;

    private Integer timeoutSeconds;

    private Integer failureThreshold;
}