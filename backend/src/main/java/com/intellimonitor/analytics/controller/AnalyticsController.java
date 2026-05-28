package com.intellimonitor.analytics.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.intellimonitor.analytics.dto.DashboardStatsResponse;
import com.intellimonitor.analytics.dto.ResponseTimePoint;
import com.intellimonitor.analytics.service.AnalyticsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService
            analyticsService;

    /*
     * DASHBOARD STATS
     */

    @GetMapping("/dashboard")
    public DashboardStatsResponse
    getDashboardStats() {

        return analyticsService
                .getDashboardStats();
    }

    /*
     * RESPONSE TIME ANALYTICS
     */

    @GetMapping("/response-times")
    public List<ResponseTimePoint>
    getResponseTimes() {

        return analyticsService
                .getResponseTimeAnalytics();
    }
}