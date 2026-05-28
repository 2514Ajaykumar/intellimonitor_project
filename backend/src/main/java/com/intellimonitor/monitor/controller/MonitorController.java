package com.intellimonitor.monitor.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.intellimonitor.monitor.dto.CreateMonitorRequest;
import com.intellimonitor.monitor.dto.MonitorHistoryResponse;
import com.intellimonitor.monitor.dto.MonitorResponse;
import com.intellimonitor.monitor.service.MonitorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/monitors")
@RequiredArgsConstructor
public class MonitorController {

    private final MonitorService monitorService;

    @PostMapping
    public MonitorResponse createMonitor(
            @Valid
            @RequestBody
            CreateMonitorRequest request,

            Authentication authentication
    ) {

        return monitorService.createMonitor(
                request,
                authentication
        );
    }

    @GetMapping
    public List<MonitorResponse> getMyMonitors(
            Authentication authentication
    ) {

        return monitorService.getMyMonitors(
                authentication
        );
    }

    @GetMapping("/{id}/history")
    public List<MonitorHistoryResponse>
    getMonitorHistory(
            @PathVariable Long id
    ) {

        return monitorService
                .getMonitorHistory(id);
    }

    @DeleteMapping("/{id}")
    public String deleteMonitor(
            @PathVariable Long id,
            Authentication authentication
    ) {

        monitorService.deleteMonitor(
                id,
                authentication
        );

        return "Monitor deleted successfully";
    }
}