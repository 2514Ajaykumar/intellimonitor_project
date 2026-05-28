package com.intellimonitor.analytics.service;

import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.intellimonitor.analytics.dto.DashboardStatsResponse;
import com.intellimonitor.analytics.dto.ResponseTimePoint;
import com.intellimonitor.monitor.entity.MonitorCheckResult;
import com.intellimonitor.monitor.enums.MonitorStatus;
import com.intellimonitor.monitor.repository.MonitorCheckResultRepository;
import com.intellimonitor.monitor.repository.MonitorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final MonitorRepository
            monitorRepository;

    private final MonitorCheckResultRepository
            resultRepository;

    /*
     * DASHBOARD STATS
     */

    public DashboardStatsResponse
    getDashboardStats() {

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

        Double avgResponseTime =
                resultRepository
                        .getAverageResponseTime();

        if (avgResponseTime == null) {

            avgResponseTime = 0.0;
        }

        return DashboardStatsResponse
                .builder()
                .totalMonitors(totalMonitors)
                .upMonitors(upMonitors)
                .downMonitors(downMonitors)
                .averageResponseTime(
                        Math.round(avgResponseTime)
                                * 1.0
                )
                .build();
    }

    /*
     * RESPONSE TIME ANALYTICS
     */

    public List<ResponseTimePoint>
    getResponseTimeAnalytics() {

        List<MonitorCheckResult> results =
                resultRepository
                        .findTop20ByOrderByCheckedAtDesc();

        return results.stream()
                .map(result ->
                        ResponseTimePoint.builder()
                                .time(
                                        result
                                                .getCheckedAt()
                                                .format(
                                                        DateTimeFormatter.ofPattern(
                                                                "HH:mm:ss"
                                                        )
                                                )
                                )
                                .responseTime(
                                        result
                                                .getResponseTimeMs()
                                )
                                .build()
                )
                .toList();
    }
}