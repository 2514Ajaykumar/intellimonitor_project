package com.intellimonitor.publicstatus.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.intellimonitor.monitor.dto.MonitorResponse;
import com.intellimonitor.monitor.entity.Monitor;
import com.intellimonitor.monitor.repository.MonitorRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicStatusController {

    private final MonitorRepository
            monitorRepository;

    @GetMapping("/status")
    public List<MonitorResponse>
    getPublicStatus() {

        List<Monitor> monitors =
                monitorRepository.findAll();

        return monitors.stream()
                .map(monitor ->

                        MonitorResponse.builder()
                                .id(
                                        monitor.getId()
                                )
                                .name(
                                        monitor.getName()
                                )
                                .url(
                                        monitor.getUrl()
                                )
                                .method(
                                        monitor.getMethod()
                                )
                                .status(
                                        monitor.getStatus()
                                )
                                .intervalSeconds(
                                        monitor.getIntervalSeconds()
                                )
                                .build()
                )
                .toList();
    }
}