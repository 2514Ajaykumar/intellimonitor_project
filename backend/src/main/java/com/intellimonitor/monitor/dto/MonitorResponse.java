package com.intellimonitor.monitor.dto;

import com.intellimonitor.monitor.enums.HttpMethod;
import com.intellimonitor.monitor.enums.MonitorStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MonitorResponse {

    private Long id;

    private String name;

    private String url;

    private HttpMethod method;

    private MonitorStatus status;

    private Integer intervalSeconds;
}