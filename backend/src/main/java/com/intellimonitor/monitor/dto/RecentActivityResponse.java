package com.intellimonitor.monitor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecentActivityResponse {

    private String monitorName;

    private String status;

    private Long responseTime;

    private String checkedAt;
}