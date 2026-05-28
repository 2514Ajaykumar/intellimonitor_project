package com.intellimonitor.analytics.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsResponse {

    private Long totalMonitors;

    private Long upMonitors;

    private Long downMonitors;

    private Double averageResponseTime;
}