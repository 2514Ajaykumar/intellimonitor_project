package com.intellimonitor.incident.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.intellimonitor.incident.dto.IncidentResponse;
import com.intellimonitor.incident.service.IncidentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
public class IncidentController {

    private final IncidentService
            incidentService;

    /*
     * ALL INCIDENTS
     */

    @GetMapping
    public List<IncidentResponse>
    getAllIncidents() {

        return incidentService
                .getAllIncidents();
    }

    /*
     * ACTIVE INCIDENTS
     */

    @GetMapping("/open")
    public List<IncidentResponse>
    getOpenIncidents() {

        return incidentService
                .getOpenIncidents();
    }
}