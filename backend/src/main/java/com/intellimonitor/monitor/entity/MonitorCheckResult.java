package com.intellimonitor.monitor.entity;

import com.intellimonitor.monitor.enums.CheckStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "monitor_check_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MonitorCheckResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private CheckStatus status;

    private Integer statusCode;

    private Long responseTimeMs;

    @Column(columnDefinition = "TEXT")
    private String errorMessage;

    private LocalDateTime checkedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "monitor_id")
    private Monitor monitor;
}