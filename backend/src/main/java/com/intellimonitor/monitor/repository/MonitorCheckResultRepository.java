package com.intellimonitor.monitor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.intellimonitor.monitor.entity.Monitor;
import com.intellimonitor.monitor.entity.MonitorCheckResult;

public interface MonitorCheckResultRepository
        extends JpaRepository<MonitorCheckResult, Long> {

    @Query("""
            SELECT AVG(m.responseTimeMs)
            FROM MonitorCheckResult m
            WHERE m.responseTimeMs IS NOT NULL
            """)
    Double getAverageResponseTime();

    List<MonitorCheckResult>
    findTop20ByMonitorOrderByCheckedAtDesc(
            Monitor monitor
    );
    List<MonitorCheckResult>
        findTop20ByMonitorIdOrderByCheckedAtDesc(
                Long monitorId
        );

    List<MonitorCheckResult>
    findTop10ByOrderByCheckedAtDesc();
    List<MonitorCheckResult>
    findTop20ByOrderByCheckedAtDesc();
}