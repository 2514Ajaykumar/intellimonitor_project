package com.intellimonitor.monitor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.intellimonitor.monitor.entity.Monitor;
import com.intellimonitor.monitor.enums.MonitorStatus;
import com.intellimonitor.user.entity.User;

public interface MonitorRepository
        extends JpaRepository<Monitor, Long> {

    List<Monitor> findByCreatedBy(User user);

    Long countByStatus(MonitorStatus status);
}