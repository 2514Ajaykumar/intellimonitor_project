IntelliMonitor – Full Project Documentation 
1. Project Title
IntelliMonitor – Real-Time Uptime Monitoring & Incident Management Platform
2. Project Overview

IntelliMonitor is a full-stack real-time monitoring platform designed to track the uptime and health status of APIs, websites, and services. The system continuously monitors configured endpoints, detects outages, creates incidents, sends email alerts, and provides analytics through an interactive dashboard.

The project simulates the core functionalities of production-grade observability platforms like:

UptimeRobot
Better Stack
Pingdom
Statuspage

The application supports:

Real-time monitor checks
Incident lifecycle management
Email notifications
Analytics dashboard
Public status pages
JWT authentication
Response time tracking
3. Tech Stack
Frontend
React.js
Vite
Tailwind CSS
Axios
React Router DOM
Recharts
Lucide React Icons
Backend
Spring Boot
Spring Security
JWT Authentication
Spring Scheduler
Spring Data JPA
Hibernate ORM
REST APIs
Database
PostgreSQL
Notifications
JavaMailSender
Gmail SMTP
Deployment
Vercel (Frontend)
Render (Backend)
Neon PostgreSQL
4. Main Features
Authentication
User Registration
User Login
JWT Token-based Authentication
Protected Routes
Monitoring
Create Monitors
Delete Monitors
Real-time Health Checks
Automatic Status Updates
Incident Management
Auto Incident Creation
Incident Resolution
Downtime Tracking
Alerts
DOWN Email Alerts
Recovery Email Alerts
Dashboard
Total Monitors
UP Monitors
DOWN Monitors
Average Response Time
Monitoring Charts
Public Status Page
Public Service Status
Real-time Service Availability
5. High-Level Architecture

Frontend (React)
↓
REST API Calls
↓
Spring Boot Backend
↓
Scheduler + Services
↓
PostgreSQL Database
↓
Email Notification System

6. Database Design
Users Table

Stores:

user information
login credentials
roles

Fields:

id
name
email
password
role
created_at
Monitors Table

Stores:

monitor configurations

Fields:

id
name
url
method
status
interval_seconds
timeout_seconds
failure_threshold
user_id

Relationships:

Many monitors belong to one user
Monitor Check Results Table

Stores:

monitoring history
response times
errors

Fields:

id
monitor_id
status
status_code
response_time_ms
error_message
checked_at
Incidents Table

Stores:

outage incidents

Fields:

id
monitor_id
message
status
started_at
resolved_at
duration_seconds
7. Authentication Flow
Registration Flow
User submits registration form
Backend validates data
Password encrypted using BCrypt
User stored in PostgreSQL
Success response returned
Login Flow
User submits email/password
Spring Security authenticates user
JWT token generated
Token returned to frontend
Frontend stores token in localStorage
Protected routes become accessible
JWT Flow
Token added in Authorization header
Backend filter validates token
User authentication loaded into SecurityContext
8. Monitoring Workflow
Monitor Creation
User creates monitor
Monitor saved in PostgreSQL
Initial status = UNKNOWN
Scheduler Workflow

The application uses:

@Scheduled(fixedRate = 30000)

Scheduler runs every 30 seconds.

Steps:

Fetch all monitors
Send HTTP request using RestTemplate
Measure response time
Detect UP/DOWN state
Save monitor check result
Update monitor status
Create incidents if needed
Send email alerts
9. Monitor Status Lifecycle

UNKNOWN
↓
UP
↓
DOWN
↓
UP (Recovery)

10. Incident Management Flow
When Service Goes DOWN
Scheduler detects failure
Monitor marked DOWN
Incident created
DOWN email alert sent
When Service Recovers
Scheduler detects successful response
Monitor marked UP
Incident resolved
Duration calculated
Recovery email sent
11. Email Notification System

Implemented using:

JavaMailSender

Two alert types:

DOWN Alert
Recovery Alert

SMTP Provider:

Gmail SMTP
12. Analytics Dashboard

Dashboard displays:

Total monitors
UP monitors
DOWN monitors
Average response time

Charts built using:

Recharts
13. Public Status Page

A public route displaying:

all monitor statuses
operational systems
outage indicators

Purpose:

transparency for users/customers
14. Security Implementation

Implemented:

JWT authentication
BCrypt password hashing
Protected routes
CORS configuration
Stateless authentication
15. Important Backend Concepts Used
Spring Boot

Used for:

REST APIs
Dependency Injection
Scheduling
Service architecture
Hibernate/JPA

Used for:

ORM mapping
Relationships
Database operations
Scheduler

Used for:

automated monitor checks
REST APIs

Used for:

frontend-backend communication
16. Important Frontend Concepts Used
React Hooks
useState
useEffect
useContext
Routing
Protected routes
Public routes
Axios
API communication
Polling
automatic monitor refresh
17. Real Problems Faced During Development
1. UNKNOWN Status Bug

Problem:

Monitors remained UNKNOWN

Cause:

frontend state not refreshing

Fix:

implemented polling
forced React re-render
2. LazyInitializationException

Problem:

Hibernate session closed while accessing User entity

Cause:

LAZY loading

Fix:

fetch = FetchType.EAGER
3. Email Notification Issues

Problem:

emails not sent

Causes:

stale compiled classes
Gmail SMTP auth
missing App Password

Fix:

Gmail App Password
clean rebuild
4. Protected Website Failures

Problem:

websites like Perplexity returned 403

Cause:

Cloudflare anti-bot protection

Fix:

treated blocked responses as DOWN
18. Deployment Strategy

Frontend:

deployed on Vercel

Backend:

deployed on Render

Database:

Neon PostgreSQL

Secrets managed through:

environment variables
19. Future Improvements
Advanced Features
WebSocket live updates
Redis caching
Docker containerization
Kubernetes
Retry mechanisms
Rate limiting
Multi-region monitoring
Prometheus metrics
Grafana dashboards
Kafka queues


Dashboard :

<img width="1920" height="968" alt="image" src="https://github.com/user-attachments/assets/60aec0bd-2b5c-43f0-bd3a-f12d27089ee8" />

Monitors :

<img width="1920" height="969" alt="{B844BDB0-31CA-4778-BFED-C643BFFA6D89}" src="https://github.com/user-attachments/assets/d6aab48e-17e7-4ad4-a679-6a7cb6de30c4" />

