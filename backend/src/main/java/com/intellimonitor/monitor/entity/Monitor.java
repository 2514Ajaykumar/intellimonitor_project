package com.intellimonitor.monitor.entity;

import com.intellimonitor.incident.entity.Incident;
import com.intellimonitor.monitor.enums.HttpMethod;
import com.intellimonitor.monitor.enums.MonitorStatus;
import com.intellimonitor.user.entity.User;


import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "monitors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Monitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = false)
    private String url;

    @Enumerated(EnumType.STRING)
    private HttpMethod method;

    @Enumerated(EnumType.STRING)
    private MonitorStatus status;

    private Integer intervalSeconds;

    private Integer timeoutSeconds;

    private Integer failureThreshold;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User createdBy;

    private LocalDateTime createdAt;

    /*
     * MONITOR HISTORY
     */

    @OneToMany(
            mappedBy = "monitor",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<MonitorCheckResult> checkResults;
    @OneToMany(
        mappedBy = "monitor",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Incident> incidents;
}