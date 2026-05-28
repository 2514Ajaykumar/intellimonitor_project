package com.intellimonitor.incident.entity;

import java.time.LocalDateTime;

import com.intellimonitor.incident.enums.IncidentStatus;
import com.intellimonitor.monitor.entity.Monitor;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "incidents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * RELATED MONITOR
     */

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "monitor_id")
    // private Monitor monitor;
    @ManyToOne(
        fetch = FetchType.LAZY
)
@JoinColumn(
        name = "monitor_id",
        foreignKey = @ForeignKey(
                foreignKeyDefinition =
                        "FOREIGN KEY (monitor_id) REFERENCES monitors(id) ON DELETE CASCADE"
        )
)
private Monitor monitor;

    /*
     * OPEN / RESOLVED
     */

    @Enumerated(EnumType.STRING)
    private IncidentStatus status;

    /*
     * FAILURE MESSAGE
     */

    @Column(columnDefinition = "TEXT")
    private String message;

    /*
     * INCIDENT START
     */

    private LocalDateTime startedAt;

    /*
     * INCIDENT END
     */

    private LocalDateTime resolvedAt;

    /*
     * TOTAL DURATION
     */

    private Long durationSeconds;
}