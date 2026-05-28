package com.intellimonitor.notification.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender
            mailSender;

    public void sendDownAlert(
            String toEmail,
            String monitorName,
            String monitorUrl
    ) {

        try {

            SimpleMailMessage message =
                    new SimpleMailMessage();

            /*
             * CHANGE THIS EMAIL
             * USE SAME EMAIL AS application.properties
             */
            message.setFrom(
                    "ajaypasula2004@gmail.com"
            );

            message.setTo(toEmail);

            message.setSubject(
                    "🚨 IntelliMonitor Alert: "
                            + monitorName
                            + " is DOWN"
            );

            message.setText(
                    """
                    ALERT!

                    Your monitor is DOWN.

                    Monitor: %s
                    URL: %s

                    Please investigate immediately.

                    - IntelliMonitor
                    """
                            .formatted(
                                    monitorName,
                                    monitorUrl
                            )
            );

            System.out.println(
                    "EMAIL SENDING..."
            );

            System.out.println(
                    "TO EMAIL: "
                            + toEmail
            );

            mailSender.send(message);

            System.out.println(
                    "DOWN EMAIL SENT SUCCESSFULLY"
            );

        } catch (Exception e) {

            System.out.println(
                    "EMAIL ERROR: "
                            + e.getMessage()
            );

            e.printStackTrace();
        }
    }

    public void sendRecoveryAlert(
            String toEmail,
            String monitorName,
            String monitorUrl
    ) {

        try {

            SimpleMailMessage message =
                    new SimpleMailMessage();

            /*
             * CHANGE THIS EMAIL
             * USE SAME EMAIL AS application.properties
             */
            message.setFrom(
                    "ajaypasula2004@gmail.com"
            );

            message.setTo(toEmail);

            message.setSubject(
                    "✅ IntelliMonitor Recovery: "
                            + monitorName
                            + " is UP again"
            );

            message.setText(
                    """
                    RECOVERY NOTICE

                    Your monitor has recovered.

                    Monitor: %s
                    URL: %s

                    System operational again.

                    - IntelliMonitor
                    """
                            .formatted(
                                    monitorName,
                                    monitorUrl
                            )
            );

            System.out.println(
                    "EMAIL SENDING..."
            );

            System.out.println(
                    "TO EMAIL: "
                            + toEmail
            );

            mailSender.send(message);

            System.out.println(
                    "RECOVERY EMAIL SENT SUCCESSFULLY"
            );

        } catch (Exception e) {

            System.out.println(
                    "EMAIL ERROR: "
                            + e.getMessage()
            );

            e.printStackTrace();
        }
    }
}