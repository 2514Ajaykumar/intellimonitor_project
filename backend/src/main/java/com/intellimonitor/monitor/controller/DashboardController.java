package com.intellimonitor.monitor.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.intellimonitor.monitor.dto.DashboardStatsResponse;
import com.intellimonitor.monitor.dto.RecentActivityResponse;
import com.intellimonitor.monitor.service.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public DashboardStatsResponse getDashboardStats() {

        return dashboardService.getDashboardStats();
    }

    @GetMapping("/activity")
    public List<RecentActivityResponse>
    getRecentActivities() {

        return dashboardService
                .getRecentActivities();
    }
}