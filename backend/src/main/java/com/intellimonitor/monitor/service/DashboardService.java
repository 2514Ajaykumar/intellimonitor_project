package com.intellimonitor.monitor.service;

import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.intellimonitor.monitor.dto.DashboardStatsResponse;
import com.intellimonitor.monitor.dto.RecentActivityResponse;
import com.intellimonitor.monitor.entity.MonitorCheckResult;
import com.intellimonitor.monitor.enums.CheckStatus;
import com.intellimonitor.monitor.enums.MonitorStatus;
import com.intellimonitor.monitor.repository.MonitorCheckResultRepository;
import com.intellimonitor.monitor.repository.MonitorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final MonitorRepository monitorRepository;

    private final MonitorCheckResultRepository
            checkResultRepository;

    public DashboardStatsResponse getDashboardStats() {

        Long totalMonitors =
                monitorRepository.count();

        Long upMonitors =
                monitorRepository.countByStatus(
                        MonitorStatus.UP
                );

        Long downMonitors =
                monitorRepository.countByStatus(
                        MonitorStatus.DOWN
                );

        Double averageResponseTime =
                checkResultRepository
                        .getAverageResponseTime();

        if (averageResponseTime == null) {
            averageResponseTime = 0.0;
        }

        Double uptimePercentage = 0.0;

        if (totalMonitors > 0) {

            uptimePercentage =
                    ((double) upMonitors
                            / totalMonitors) * 100;
        }

        return DashboardStatsResponse.builder()
                .totalMonitors(totalMonitors)
                .upMonitors(upMonitors)
                .downMonitors(downMonitors)
                .averageResponseTime(
                        Math.round(averageResponseTime)
                                * 1.0
                )
                .uptimePercentage(
                        Math.round(uptimePercentage)
                                * 1.0
                )
                .build();
    }

    public List<RecentActivityResponse>
    getRecentActivities() {

        List<MonitorCheckResult> results =
                checkResultRepository
                        .findTop10ByOrderByCheckedAtDesc();

        return results.stream()
                .map(this::mapToActivityResponse)
                .toList();
    }

    private RecentActivityResponse
    mapToActivityResponse(
            MonitorCheckResult result
    ) {

        String status =
                result.getStatus() ==
                        CheckStatus.SUCCESS
                        ? "UP"
                        : "DOWN";

        return RecentActivityResponse.builder()
                .monitorName(
                        result.getMonitor().getName()
                )
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
}