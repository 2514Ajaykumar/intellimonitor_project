// package com.intellimonitor.monitor.service;

// import java.time.LocalDateTime;
// import java.time.temporal.ChronoUnit;
// import java.util.List;
// import java.util.Optional;

// import org.springframework.scheduling.annotation.Scheduled;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;

// import com.intellimonitor.incident.entity.Incident;
// import com.intellimonitor.incident.enums.IncidentStatus;
// import com.intellimonitor.incident.repository.IncidentRepository;
// import com.intellimonitor.monitor.entity.Monitor;
// import com.intellimonitor.monitor.entity.MonitorCheckResult;
// import com.intellimonitor.monitor.enums.CheckStatus;
// import com.intellimonitor.monitor.enums.MonitorStatus;
// import com.intellimonitor.monitor.repository.MonitorCheckResultRepository;
// import com.intellimonitor.monitor.repository.MonitorRepository;
// import com.intellimonitor.notification.service.EmailService;

// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// public class MonitorCheckingService {

//     private final MonitorRepository
//             monitorRepository;

//     private final MonitorCheckResultRepository
//             checkResultRepository;

//     private final IncidentRepository
//             incidentRepository;

//     private final RestTemplate
//             restTemplate;

//     private final EmailService
//             emailService;

//     @Scheduled(fixedRate = 30000)
//     public void checkAllMonitors() {

//         System.out.println(
//                 "Running monitor checks..."
//         );

//         List<Monitor> monitors =
//                 monitorRepository.findAll();
//         System.out.println(
//         "TOTAL MONITORS: "
//                 + monitors.size()
//         );

//         for (Monitor m : monitors) {

//         System.out.println(
//                 "CHECKING: "
//                         + m.getName()
//         );
//         }

//         for (Monitor monitor : monitors) {

//             try {

//                 checkMonitor(monitor);

//             } catch (Exception ex) {

//                 System.out.println(
//                         "Monitor deleted while checking: "
//                                 + monitor.getId()
//                 );
//             }
//         }
//     }

//     private void checkMonitor(
//             Monitor monitor
//     ) {

//         long startTime =
//                 System.currentTimeMillis();

//         try {

//             var response =
//                     restTemplate.getForEntity(
//                             monitor.getUrl(),
//                             String.class
//                     );

//             long responseTime =
//                     System.currentTimeMillis()
//                             - startTime;

//             /*
//              * SAVE PREVIOUS STATUS
//              */

//             MonitorStatus previousStatus =
//                     monitor.getStatus();

//             /*
//              * MARK UP
//              */

//             monitor.setStatus(
//                     MonitorStatus.UP
//             );

//             /*
//              * SEND RECOVERY EMAIL
//              */

//             if (
//                     previousStatus
//                             == MonitorStatus.DOWN
//             ) {

//                 System.out.println(
//                         "RECOVERY EMAIL"
//                 );

//                 emailService
//                         .sendRecoveryAlert(

//                                 monitor
//                                         .getCreatedBy()
//                                         .getEmail(),

//                                 monitor.getName(),

//                                 monitor.getUrl()
//                         );
//             }

//             monitorRepository.save(
//                     monitor
//             );

//             /*
//              * SAVE SUCCESS RESULT
//              */

//             MonitorCheckResult result =
//                     MonitorCheckResult.builder()
//                             .monitor(monitor)
//                             .status(
//                                     CheckStatus.SUCCESS
//                             )
//                             .statusCode(
//                                     response
//                                             .getStatusCode()
//                                             .value()
//                             )
//                             .responseTimeMs(
//                                     responseTime
//                             )
//                             .checkedAt(
//                                     LocalDateTime.now()
//                             )
//                             .build();

//             checkResultRepository.save(
//                     result
//             );

//             /*
//              * RESOLVE INCIDENT
//              */

//             Optional<Incident> optionalIncident =
//                     incidentRepository
//                             .findByMonitorAndStatus(
//                                     monitor,
//                                     IncidentStatus.OPEN
//                             );

//             if (
//                     optionalIncident.isPresent()
//             ) {

//                 Incident incident =
//                         optionalIncident.get();

//                 incident.setStatus(
//                         IncidentStatus.RESOLVED
//                 );

//                 incident.setResolvedAt(
//                         LocalDateTime.now()
//                 );

//                 long duration =
//                         ChronoUnit.SECONDS.between(
//                                 incident.getStartedAt(),
//                                 LocalDateTime.now()
//                         );

//                 incident.setDurationSeconds(
//                         duration
//                 );

//                 incidentRepository.save(
//                         incident
//                 );

//                 System.out.println(
//                         "Incident resolved for "
//                                 + monitor.getName()
//                 );
//             }

//             System.out.println(
//                     monitor.getName()
//                             + " is UP"
//             );

//         } catch (Exception e) {

//             long responseTime =
//                     System.currentTimeMillis()
//                             - startTime;

//             /*
//              * SAVE PREVIOUS STATUS
//              */

//             MonitorStatus previousStatus =
//                     monitor.getStatus();

//             /*
//              * MARK DOWN
//              */

//             monitor.setStatus(
//                     MonitorStatus.DOWN
//             );

//             /*
//              * SEND DOWN EMAIL
//              */

//             if (
//                     previousStatus
//                             != MonitorStatus.DOWN
//             ) {

//                 System.out.println(
//                         "DOWN EMAIL"
//                 );

//                 emailService
//                         .sendDownAlert(

//                                 monitor
//                                         .getCreatedBy()
//                                         .getEmail(),

//                                 monitor.getName(),

//                                 monitor.getUrl()
//                         );
//             }

//             monitorRepository.save(
//                     monitor
//             );

//             /*
//              * SAVE FAILURE RESULT
//              */

//             MonitorCheckResult result =
//                     MonitorCheckResult.builder()
//                             .monitor(monitor)
//                             .status(
//                                     CheckStatus.FAILURE
//                             )
//                             .statusCode(500)
//                             .responseTimeMs(
//                                     responseTime
//                             )
//                             .errorMessage(
//                                     getCleanErrorMessage(e)
//                             )
//                             .checkedAt(
//                                     LocalDateTime.now()
//                             )
//                             .build();

//             checkResultRepository.save(
//                     result
//             );

//             /*
//              * CREATE INCIDENT
//              */

//             Optional<Incident> optionalIncident =
//                     incidentRepository
//                             .findByMonitorAndStatus(
//                                     monitor,
//                                     IncidentStatus.OPEN
//                             );

//             if (
//                     optionalIncident.isEmpty()
//             ) {

//                 Incident incident =
//                         Incident.builder()
//                                 .monitor(monitor)
//                                 .status(
//                                         IncidentStatus.OPEN
//                                 )
//                                 .message(
//                                         getCleanErrorMessage(e)
//                                 )
//                                 .startedAt(
//                                         LocalDateTime.now()
//                                 )
//                                 .build();

//                 incidentRepository.save(
//                         incident
//                 );

//                 System.out.println(
//                         "Incident created for "
//                                 + monitor.getName()
//                 );
//             }

//             System.out.println(
//                     monitor.getName()
//                             + " is DOWN"
//             );
//         }
//     }

//     /*
//      * CLEAN ERROR MESSAGE
//      */

//     private String getCleanErrorMessage(
//             Exception e
//     ) {

//         String message =
//                 e.getMessage();

//         if (message == null) {

//             return
//                     "Unknown monitoring error";
//         }

//         message = message
//                 .replaceAll(
//                         "<[^>]*>",
//                         ""
//                 )
//                 .replaceAll(
//                         "\\s+",
//                         " "
//                 )
//                 .trim();

//         if (message.length() > 300) {

//             return message.substring(
//                     0,
//                     300
//             ) + "...";
//         }

//         return message;
//     }
// }



// package com.intellimonitor.monitor.service;

// import java.time.LocalDateTime;
// import java.time.temporal.ChronoUnit;
// import java.util.List;
// import java.util.Optional;

// import org.springframework.scheduling.annotation.Scheduled;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;

// import com.intellimonitor.incident.entity.Incident;
// import com.intellimonitor.incident.enums.IncidentStatus;
// import com.intellimonitor.incident.repository.IncidentRepository;
// import com.intellimonitor.monitor.entity.Monitor;
// import com.intellimonitor.monitor.entity.MonitorCheckResult;
// import com.intellimonitor.monitor.enums.CheckStatus;
// import com.intellimonitor.monitor.enums.MonitorStatus;
// import com.intellimonitor.monitor.repository.MonitorCheckResultRepository;
// import com.intellimonitor.monitor.repository.MonitorRepository;
// import com.intellimonitor.notification.service.EmailService;

// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// public class MonitorCheckingService {

//     private final MonitorRepository
//             monitorRepository;

//     private final MonitorCheckResultRepository
//             checkResultRepository;

//     private final IncidentRepository
//             incidentRepository;

//     private final RestTemplate
//             restTemplate;

//     private final EmailService
//             emailService;

//     @Scheduled(fixedRate = 30000)
//     public void checkAllMonitors() {

//         System.out.println(
//                 "Running monitor checks..."
//         );

//         List<Monitor> monitors =
//                 monitorRepository.findAll();

//         System.out.println(
//                 "TOTAL MONITORS: "
//                         + monitors.size()
//         );

//         for (Monitor m : monitors) {

//             System.out.println(
//                     "CHECKING: "
//                             + m.getName()
//             );
//         }

//         for (Monitor monitor : monitors) {

//             try {

//                 checkMonitor(monitor);

//             } catch (Exception ex) {

//                 System.out.println(
//                         "Monitor deleted while checking: "
//                                 + monitor.getId()
//                 );
//             }
//         }
//     }

//     private void checkMonitor(
//             Monitor monitor
//     ) {

//         long startTime =
//                 System.currentTimeMillis();

//         try {

//             /*
//              * SAFE REQUEST HANDLING
//              */

//             org.springframework.http.ResponseEntity<String>
//                     response;

//             try {

//                 response =
//                         restTemplate.getForEntity(
//                                 monitor.getUrl(),
//                                 String.class
//                         );

//             } catch (Exception ex) {

//                 System.out.println(
//                         monitor.getName()
//                                 + " FAILED: "
//                                 + ex.getMessage()
//                 );

//                 throw ex;
//             }

//             long responseTime =
//                     System.currentTimeMillis()
//                             - startTime;

//             /*
//              * SAVE PREVIOUS STATUS
//              */

//             MonitorStatus previousStatus =
//                     monitor.getStatus();

//             /*
//              * MARK UP
//              */

//             monitor.setStatus(
//                     MonitorStatus.UP
//             );

//             /*
//              * SEND RECOVERY EMAIL
//              */

//             if (
//                     previousStatus
//                             == MonitorStatus.DOWN
//             ) {

//                 System.out.println(
//                         "RECOVERY EMAIL"
//                 );

//                 emailService
//                         .sendRecoveryAlert(

//                                 monitor
//                                         .getCreatedBy()
//                                         .getEmail(),

//                                 monitor.getName(),

//                                 monitor.getUrl()
//                         );
//             }

//             monitorRepository.save(
//                     monitor
//             );

//             /*
//              * SAVE SUCCESS RESULT
//              */

//             MonitorCheckResult result =
//                     MonitorCheckResult.builder()
//                             .monitor(monitor)
//                             .status(
//                                     CheckStatus.SUCCESS
//                             )
//                             .statusCode(
//                                     response
//                                             .getStatusCode()
//                                             .value()
//                             )
//                             .responseTimeMs(
//                                     responseTime
//                             )
//                             .checkedAt(
//                                     LocalDateTime.now()
//                             )
//                             .build();

//             checkResultRepository.save(
//                     result
//             );

//             /*
//              * RESOLVE INCIDENT
//              */

//             Optional<Incident> optionalIncident =
//                     incidentRepository
//                             .findByMonitorAndStatus(
//                                     monitor,
//                                     IncidentStatus.OPEN
//                             );

//             if (
//                     optionalIncident.isPresent()
//             ) {

//                 Incident incident =
//                         optionalIncident.get();

//                 incident.setStatus(
//                         IncidentStatus.RESOLVED
//                 );

//                 incident.setResolvedAt(
//                         LocalDateTime.now()
//                 );

//                 long duration =
//                         ChronoUnit.SECONDS.between(
//                                 incident.getStartedAt(),
//                                 LocalDateTime.now()
//                         );

//                 incident.setDurationSeconds(
//                         duration
//                 );

//                 incidentRepository.save(
//                         incident
//                 );

//                 System.out.println(
//                         "Incident resolved for "
//                                 + monitor.getName()
//                 );
//             }

//             System.out.println(
//                     monitor.getName()
//                             + " is UP"
//             );

//         } catch (Exception e) {

//             long responseTime =
//                     System.currentTimeMillis()
//                             - startTime;

//             /*
//              * SAVE PREVIOUS STATUS
//              */

//             MonitorStatus previousStatus =
//                     monitor.getStatus();

//             /*
//              * MARK DOWN
//              */

//             monitor.setStatus(
//                     MonitorStatus.DOWN
//             );

//             /*
//              * SEND DOWN EMAIL
//              */

//             if (
//                     previousStatus
//                             != MonitorStatus.DOWN
//             ) {

//                 System.out.println(
//                         "DOWN EMAIL"
//                 );

//                 emailService
//                         .sendDownAlert(

//                                 monitor
//                                         .getCreatedBy()
//                                         .getEmail(),

//                                 monitor.getName(),

//                                 monitor.getUrl()
//                         );
//             }

//             monitorRepository.save(
//                     monitor
//             );

//             /*
//              * SAVE FAILURE RESULT
//              */

//             MonitorCheckResult result =
//                     MonitorCheckResult.builder()
//                             .monitor(monitor)
//                             .status(
//                                     CheckStatus.FAILURE
//                             )
//                             .statusCode(500)
//                             .responseTimeMs(
//                                     responseTime
//                             )
//                             .errorMessage(
//                                     getCleanErrorMessage(e)
//                             )
//                             .checkedAt(
//                                     LocalDateTime.now()
//                             )
//                             .build();

//             checkResultRepository.save(
//                     result
//             );

//             /*
//              * CREATE INCIDENT
//              */

//             Optional<Incident> optionalIncident =
//                     incidentRepository
//                             .findByMonitorAndStatus(
//                                     monitor,
//                                     IncidentStatus.OPEN
//                             );

//             if (
//                     optionalIncident.isEmpty()
//             ) {

//                 Incident incident =
//                         Incident.builder()
//                                 .monitor(monitor)
//                                 .status(
//                                         IncidentStatus.OPEN
//                                 )
//                                 .message(
//                                         getCleanErrorMessage(e)
//                                 )
//                                 .startedAt(
//                                         LocalDateTime.now()
//                                 )
//                                 .build();

//                 incidentRepository.save(
//                         incident
//                 );

//                 System.out.println(
//                         "Incident created for "
//                                 + monitor.getName()
//                 );
//             }

//             System.out.println(
//                     monitor.getName()
//                             + " is DOWN"
//             );
//         }
//     }

//     /*
//      * CLEAN ERROR MESSAGE
//      */

//     private String getCleanErrorMessage(
//             Exception e
//     ) {

//         String message =
//                 e.getMessage();

//         if (message == null) {

//             return
//                     "Unknown monitoring error";
//         }

//         message = message
//                 .replaceAll(
//                         "<[^>]*>",
//                         ""
//                 )
//                 .replaceAll(
//                         "\\s+",
//                         " "
//                 )
//                 .trim();

//         if (message.length() > 300) {

//             return message.substring(
//                     0,
//                     300
//             ) + "...";
//         }

//         return message;
//     }
// }


package com.intellimonitor.monitor.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.intellimonitor.incident.entity.Incident;
import com.intellimonitor.incident.enums.IncidentStatus;
import com.intellimonitor.incident.repository.IncidentRepository;
import com.intellimonitor.monitor.entity.Monitor;
import com.intellimonitor.monitor.entity.MonitorCheckResult;
import com.intellimonitor.monitor.enums.CheckStatus;
import com.intellimonitor.monitor.enums.MonitorStatus;
import com.intellimonitor.monitor.repository.MonitorCheckResultRepository;
import com.intellimonitor.monitor.repository.MonitorRepository;
import com.intellimonitor.notification.service.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MonitorCheckingService {

    private final MonitorRepository
            monitorRepository;

    private final MonitorCheckResultRepository
            checkResultRepository;

    private final IncidentRepository
            incidentRepository;

    private final RestTemplate
            restTemplate;

    private final EmailService
            emailService;

    @Scheduled(fixedRate = 30000)
    public void checkAllMonitors() {

        System.out.println(
                "Running monitor checks..."
        );

        List<Monitor> monitors =
                monitorRepository.findAll();

        System.out.println(
                "TOTAL MONITORS: "
                        + monitors.size()
        );

        for (Monitor m : monitors) {

            System.out.println(
                    "CHECKING: "
                            + m.getName()
            );
        }

        for (Monitor monitor : monitors) {

            try {

                checkMonitor(monitor);

            } catch (Exception ex) {

                System.out.println(
                        "Error checking monitor: "
                                + monitor.getId()
                );

                ex.printStackTrace();
            }
        }
    }

    private void checkMonitor(
            Monitor monitor
    ) {

        long startTime =
                System.currentTimeMillis();

        try {

            org.springframework.http.ResponseEntity<String>
                    response;

            try {

                response =
                        restTemplate.getForEntity(
                                monitor.getUrl(),
                                String.class
                        );

            } catch (Exception ex) {

                System.out.println(
                        monitor.getName()
                                + " FAILED: "
                                + ex.getMessage()
                );

                throw ex;
            }

            long responseTime =
                    System.currentTimeMillis()
                            - startTime;

            /*
             * PREVIOUS STATUS
             */

            MonitorStatus previousStatus =
                    monitor.getStatus();

            /*
             * MARK UP
             */

            monitor.setStatus(
                    MonitorStatus.UP
            );

            /*
             * SEND RECOVERY EMAIL
             */

            if (
                    previousStatus
                            == MonitorStatus.DOWN
            ) {

                if (
                        monitor.getCreatedBy() != null
                        &&
                        monitor.getCreatedBy().getEmail() != null
                ) {

                    System.out.println(
                            "RECOVERY EMAIL"
                    );

                    emailService
                            .sendRecoveryAlert(

                                    monitor
                                            .getCreatedBy()
                                            .getEmail(),

                                    monitor.getName(),

                                    monitor.getUrl()
                            );
                }
            }

            monitorRepository.save(
                    monitor
            );

            /*
             * SAVE SUCCESS RESULT
             */

            MonitorCheckResult result =
                    MonitorCheckResult.builder()
                            .monitor(monitor)
                            .status(
                                    CheckStatus.SUCCESS
                            )
                            .statusCode(
                                    response
                                            .getStatusCode()
                                            .value()
                            )
                            .responseTimeMs(
                                    responseTime
                            )
                            .checkedAt(
                                    LocalDateTime.now()
                            )
                            .build();

            checkResultRepository.save(
                    result
            );

            /*
             * RESOLVE INCIDENT
             */

            Optional<Incident> optionalIncident =
                    incidentRepository
                            .findByMonitorAndStatus(
                                    monitor,
                                    IncidentStatus.OPEN
                            );

            if (
                    optionalIncident.isPresent()
            ) {

                Incident incident =
                        optionalIncident.get();

                incident.setStatus(
                        IncidentStatus.RESOLVED
                );

                incident.setResolvedAt(
                        LocalDateTime.now()
                );

                long duration =
                        ChronoUnit.SECONDS.between(
                                incident.getStartedAt(),
                                LocalDateTime.now()
                        );

                incident.setDurationSeconds(
                        duration
                );

                incidentRepository.save(
                        incident
                );

                System.out.println(
                        "Incident resolved for "
                                + monitor.getName()
                );
            }

            System.out.println(
                    monitor.getName()
                            + " is UP"
            );

        } catch (Exception e) {

            long responseTime =
                    System.currentTimeMillis()
                            - startTime;

            /*
             * PREVIOUS STATUS
             */

            MonitorStatus previousStatus =
                    monitor.getStatus();

            /*
             * MARK DOWN
             */

            monitor.setStatus(
                    MonitorStatus.DOWN
            );

            /*
             * SEND DOWN EMAIL
             */

            if (
                    previousStatus
                            != MonitorStatus.DOWN
            ) {

                if (
                        monitor.getCreatedBy() != null
                        &&
                        monitor.getCreatedBy().getEmail() != null
                ) {

                    System.out.println(
                            "DOWN EMAIL"
                    );

                    emailService
                            .sendDownAlert(

                                    monitor
                                            .getCreatedBy()
                                            .getEmail(),

                                    monitor.getName(),

                                    monitor.getUrl()
                            );
                }
            }

            monitorRepository.save(
                    monitor
            );

            /*
             * SAVE FAILURE RESULT
             */

            MonitorCheckResult result =
                    MonitorCheckResult.builder()
                            .monitor(monitor)
                            .status(
                                    CheckStatus.FAILURE
                            )
                            .statusCode(500)
                            .responseTimeMs(
                                    responseTime
                            )
                            .errorMessage(
                                    getCleanErrorMessage(e)
                            )
                            .checkedAt(
                                    LocalDateTime.now()
                            )
                            .build();

            checkResultRepository.save(
                    result
            );

            /*
             * CREATE INCIDENT
             */

            Optional<Incident> optionalIncident =
                    incidentRepository
                            .findByMonitorAndStatus(
                                    monitor,
                                    IncidentStatus.OPEN
                            );

            if (
                    optionalIncident.isEmpty()
            ) {

                Incident incident =
                        Incident.builder()
                                .monitor(monitor)
                                .status(
                                        IncidentStatus.OPEN
                                )
                                .message(
                                        getCleanErrorMessage(e)
                                )
                                .startedAt(
                                        LocalDateTime.now()
                                )
                                .build();

                incidentRepository.save(
                        incident
                );

                System.out.println(
                        "Incident created for "
                                + monitor.getName()
                );
            }

            System.out.println(
                    monitor.getName()
                            + " is DOWN"
            );
        }
    }

    /*
     * CLEAN ERROR MESSAGE
     */

    private String getCleanErrorMessage(
            Exception e
    ) {

        String message =
                e.getMessage();

        if (message == null) {

            return
                    "Unknown monitoring error";
        }

        message = message
                .replaceAll(
                        "<[^>]*>",
                        ""
                )
                .replaceAll(
                        "\\s+",
                        " "
                )
                .trim();

        if (message.length() > 300) {

            return message.substring(
                    0,
                    300
            ) + "...";
        }

        return message;
    }
}