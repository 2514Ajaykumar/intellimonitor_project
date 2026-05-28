package com.intellimonitor.incident.service;

import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.intellimonitor.incident.dto.IncidentResponse;
import com.intellimonitor.incident.entity.Incident;
import com.intellimonitor.incident.repository.IncidentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IncidentService {

    private final IncidentRepository
            incidentRepository;

    public List<IncidentResponse>
    getAllIncidents() {

        return incidentRepository
                .findAll()
                .stream()
                .sorted((a, b) ->
                        b.getStartedAt()
                                .compareTo(
                                        a.getStartedAt()
                                )
                )
                .map(this::mapToResponse)
                .toList();
    }

    public List<IncidentResponse>
    getOpenIncidents() {

        return incidentRepository
                .findAll()
                .stream()
                .filter(incident ->
                        incident.getResolvedAt() == null
                )
                .sorted((a, b) ->
                        b.getStartedAt()
                                .compareTo(
                                        a.getStartedAt()
                                )
                )
                .map(this::mapToResponse)
                .toList();
    }

    private IncidentResponse
    mapToResponse(
            Incident incident
    ) {

        return IncidentResponse.builder()
                .id(incident.getId())

                .monitorId(
                        incident.getMonitor()
                                .getId()
                )

                .monitorName(
                        incident.getMonitor()
                                .getName()
                )

                .status(
                        incident.getStatus()
                                .name()
                )

                .message(
                        incident.getMessage()
                )

                .startedAt(
                        incident.getStartedAt()
                                .format(
                                        DateTimeFormatter.ofPattern(
                                                "dd MMM yyyy HH:mm:ss"
                                        )
                                )
                )

                .resolvedAt(
                        incident.getResolvedAt() != null
                                ? incident.getResolvedAt()
                                .format(
                                        DateTimeFormatter.ofPattern(
                                                "dd MMM yyyy HH:mm:ss"
                                        )
                                )
                                : null
                )

                .durationSeconds(
                        incident.getDurationSeconds()
                )

                .build();
    }
}