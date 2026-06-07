# 🌾 Farmers Buddy

A full-stack, role-based agricultural management platform that connects **Farmers**, **Agriculture Officers**, **Domain Experts**, and **Admins** through a single web application.

---

## 📌 Project Overview

Farmers in India often lack a centralized digital channel to access agricultural guidance, market prices, training sessions, and expert advice. **Farmers Buddy** bridges that gap by providing each stakeholder with their own dedicated dashboard and tools — all powered by one unified backend.

---

## 👥 Roles

| Role | Responsibilities |
|------|-----------------|
| **Farmer** | Submit queries, enroll in trainings, browse mandi prices, expert solutions, tools, awareness drives, forum |
| **Officer** | Create training sessions, reply to farmer queries, publish awareness drives |
| **Expert** | Post farming solutions, upload tools, reply to farmer queries with domain expertise |
| **Admin** | Manage users, publish mandi prices, manage tools/awareness/trainings, full platform oversight |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Backend | Spring Boot 4.0.6 (Java 17) |
| ORM | Spring Data JPA + Hibernate |
| Database | MySQL |
| Security | Spring Security + BCrypt |

---

## 📁 Project Structure

```
farmers-buddy/
├── frontend/               # React application (Vite)
│   └── src/
│       ├── components/     # Reusable UI components (Navbar, Sidebars, Cards)
│       ├── pages/          # Role-based pages (farmer/, officer/, expert/, admin/, shared/)
│       └── services/       # Axios API calls (one file per feature)
│
└── backend/                # Spring Boot REST API
    └── src/main/java/.../
        ├── controller/     # HTTP endpoints
        ├── service/        # Business logic
        ├── repository/     # Database access (JPA)
        ├── entity/         # Database table mappings
        ├── dto/            # Request/Response data models
        └── config/         # Security + CORS configuration
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- **Node.js** v18+
- **Java** 17
- **Maven** 3.8+
- **MySQL** 8.0+

---

## 🗄️ Database Setup

Open MySQL and run:

```sql
CREATE DATABASE farmers_buddy_db;
```

> Hibernate will auto-create all tables on first backend startup (`ddl-auto=update`). No SQL scripts required.

**Default database credentials** (configured in `backend/src/main/resources/application.properties`):

```
Host:     localhost:3306
Database: farmers_buddy_db
Username: root
Password: root123
```

Update these values in `application.properties` if your MySQL credentials differ.

---

## 🚀 Running the Application

### 1. Start the Backend

```bash
cd backend
./mvnw spring:boot:run
```

Or open the `backend/` folder in IntelliJ IDEA and run `FarmersBuddyBackendApplication.java`.

Backend starts at: **http://localhost:8080**

---

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at: **http://localhost:5173**

---

## 🔑 Role Passkeys (for Registration)

Farmer registration is open to everyone. The following passkeys are required for privileged roles:

| Role | Passkey |
|------|---------|
| Officer | `OFFICER123` |
| Expert | `EXPERT123` |
| Admin | `ADMIN123` |

---

## 🔐 Security

- Passwords are hashed using **BCrypt** — plain-text passwords are never stored
- **ProtectedRoute** component guards all frontend pages by role
- **X-User-Role** header is automatically attached to every API request via Axios interceptor
- Sensitive endpoints (e.g. GET /api/auth/users) validate the role header on the backend
- **CORS** configured to allow requests from `localhost:5173` and `localhost:5174`

---

## 🌐 API Base URL

```
http://localhost:8080/api
```

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login |
| GET | `/auth/profile/{id}` | Get user profile |
| PUT | `/auth/profile/{id}` | Update user profile |
| GET | `/queries` | Get all queries |
| POST | `/queries` | Submit a query |
| PUT | `/queries/{id}/reply` | Officer replies to query |
| PUT | `/queries/{id}/expert-reply` | Expert replies to query |
| GET | `/trainings` | Get all trainings |
| POST | `/trainings` | Create a training |
| POST | `/trainings/enroll` | Enroll in a training |
| GET | `/solutions` | Get all expert solutions |
| POST | `/solutions` | Post an expert solution |
| GET | `/awareness` | Get all awareness drives |
| POST | `/awareness` | Create an awareness drive |
| GET | `/tools` | Get all tools |
| POST | `/tools` | Add a tool |
| GET | `/mandi` | Get mandi prices |
| POST | `/mandi` | Add a mandi price |
| GET | `/forum` | Get forum posts |
| POST | `/forum` | Create a forum post |

---

## 🗃️ Database Tables

| Table | Description |
|-------|-------------|
| `users` | All registered users with role and profile info |
| `queries` | Farmer queries with officer and expert replies |
| `trainings` | Training sessions created by officers |
| `training_enrollments` | Farmer enrollments per training |
| `tools` | Farming tools catalog |
| `awareness_drives` | Awareness campaigns |
| `expert_solutions` | Farming guidance by experts |
| `mandi_prices` | Crop market prices |
| `forum_posts` | Community forum posts |
| `forum_replies` | Replies to forum posts |

---

## 👨‍💻 Team

| Name | Role |
|------|------|
| Noorie Garg | Full Stack Developer |
| Yash Kumar | Full Stack Developer |

---

## 📄 License

This project was built as an academic project. All rights reserved.
