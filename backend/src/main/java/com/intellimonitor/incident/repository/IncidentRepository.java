package com.intellimonitor.incident.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.intellimonitor.incident.entity.Incident;
import com.intellimonitor.incident.enums.IncidentStatus;
import com.intellimonitor.monitor.entity.Monitor;

public interface IncidentRepository
        extends JpaRepository<Incident, Long> {

    /*
     * ACTIVE INCIDENT
     */

    Optional<Incident>
    findByMonitorAndStatus(
            Monitor monitor,
            IncidentStatus status
    );

    /*
     * ALL INCIDENTS
     */

    List<Incident>
    findByMonitorOrderByStartedAtDesc(
            Monitor monitor
    );

    /*
     * OPEN INCIDENTS
     */

    List<Incident>
    findByStatusOrderByStartedAtDesc(
            IncidentStatus status
    );
}