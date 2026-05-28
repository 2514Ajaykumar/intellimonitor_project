package com.intellimonitor.incident.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IncidentResponse {

    private Long id;

    private Long monitorId;

    private String monitorName;

    private String status;

    private String message;

    private String startedAt;

    private String resolvedAt;

    private Long durationSeconds;
}