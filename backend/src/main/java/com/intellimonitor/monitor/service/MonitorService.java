package com.intellimonitor.monitor.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.intellimonitor.monitor.dto.CreateMonitorRequest;
import com.intellimonitor.monitor.dto.MonitorHistoryResponse;
import com.intellimonitor.monitor.dto.MonitorResponse;
import com.intellimonitor.monitor.entity.Monitor;
import com.intellimonitor.monitor.entity.MonitorCheckResult;
import com.intellimonitor.monitor.enums.CheckStatus;
import com.intellimonitor.monitor.enums.MonitorStatus;
import com.intellimonitor.monitor.repository.MonitorCheckResultRepository;
import com.intellimonitor.monitor.repository.MonitorRepository;
import com.intellimonitor.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MonitorService {

    private final MonitorRepository monitorRepository;

    private final MonitorCheckResultRepository
            checkResultRepository;

    public MonitorResponse createMonitor(
            CreateMonitorRequest request,
            Authentication authentication
    ) {

        User user = (User) authentication.getPrincipal();

        Monitor monitor = Monitor.builder()
                .name(request.getName())
                .url(request.getUrl())
                .method(request.getMethod())
                .status(MonitorStatus.UNKNOWN)
                .intervalSeconds(request.getIntervalSeconds())
                .timeoutSeconds(request.getTimeoutSeconds())
                .failureThreshold(request.getFailureThreshold())
                .createdBy(user)
                .createdAt(LocalDateTime.now())
                .build();

        Monitor savedMonitor =
                monitorRepository.save(monitor);

        return mapToResponse(savedMonitor);
    }

    public List<MonitorResponse> getMyMonitors(
            Authentication authentication
    ) {

        User user = (User) authentication.getPrincipal();

        return monitorRepository
                .findByCreatedBy(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public void deleteMonitor(
            Long monitorId,
            Authentication authentication
    ) {

        User user = (User) authentication.getPrincipal();

        Monitor monitor =
                monitorRepository.findById(monitorId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Monitor not found"
                                )
                        );

        if (!monitor.getCreatedBy()
                .getId()
                .equals(user.getId())) {

            throw new RuntimeException(
                    "You cannot delete this monitor"
            );
        }

        monitorRepository.delete(monitor);
    }

    public List<MonitorHistoryResponse>
    getMonitorHistory(
            Long monitorId
    ) {

        List<MonitorCheckResult> results =
                checkResultRepository
                        .findTop20ByMonitorIdOrderByCheckedAtDesc(
                                monitorId
                        );

        return results.stream()
                .map(this::mapToHistoryResponse)
                .toList();
    }

    private MonitorHistoryResponse
    mapToHistoryResponse(
            MonitorCheckResult result
    ) {

        String status =
                result.getStatus()
                        == CheckStatus.SUCCESS
                        ? "UP"
                        : "DOWN";

        return MonitorHistoryResponse.builder()
                .status(status)
                .responseTime(
                        result.getResponseTimeMs()
                )
                .checkedAt(
                        result.getCheckedAt()
                                .format(
                                        DateTimeFormatter.ofPattern(
                                                "HH:mm:ss"
                                        )
                                )
                )
                .build();
    }

    private MonitorResponse mapToResponse(
            Monitor monitor
    ) {

        return MonitorResponse.builder()
                .id(monitor.getId())
                .name(monitor.getName())
                .url(monitor.getUrl())
                .method(monitor.getMethod())
                .status(monitor.getStatus())
                .intervalSeconds(
                        monitor.getIntervalSeconds()
                )
                .build();
    }
}