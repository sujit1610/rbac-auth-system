# RBAC Authentication System

A full-stack Role-Based Access Control (RBAC) system built with:
- **Backend**: Java 17, Spring Boot 3, Spring Security, JWT, Spring Data JPA, MapStruct, Lombok, Swagger/OpenAPI
- **Frontend**: React 18, TypeScript, Vite, React Router, React Query, Axios, React Hook Form, TailwindCSS
- **Database**: H2 In-Memory (no setup needed)

---

## Project Structure

```
rbac-project/
├── backend/          ← Spring Boot application
│   ├── pom.xml
│   └── src/main/java/com/rbac/
│       ├── RbacApplication.java
│       ├── config/         ← SecurityConfig, SwaggerConfig, UserMapper, GlobalExceptionHandler
│       ├── controller/     ← AuthController, ContentController
│       ├── dto/            ← RegisterRequest, LoginRequest, AuthResponse
│       ├── entity/         ← User, Role
│       ├── repository/     ← UserRepository
│       ├── security/       ← JwtUtil, JwtAuthFilter, UserDetailsServiceImpl
│       └── service/        ← AuthService
│
└── frontend/         ← React + TypeScript application
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── types/          ← TypeScript interfaces
        ├── services/       ← Axios API calls
        ├── hooks/          ← useAuth, AuthContext
        ├── components/     ← Navbar, ProtectedRoute
        └── pages/          ← LoginPage, RegisterPage, DashboardPage
```

---

## Setup & Running

### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+

---

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on: **http://localhost:8080**

- Swagger UI: http://localhost:8080/swagger-ui.html
- H2 Console: http://localhost:8080/h2-console  
  - JDBC URL: `jdbc:h2:mem:rbacdb`
  - Username: `sa` | Password: *(leave blank)*

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## API Endpoints

| Method | Endpoint          | Access       | Description              |
|--------|-------------------|--------------|--------------------------|
| POST   | /api/auth/register| Public       | Register a new user      |
| POST   | /api/auth/login   | Public       | Login and receive JWT    |
| GET    | /api/public       | Public       | Public content           |
| GET    | /api/user         | USER, ADMIN  | User-level content       |
| GET    | /api/admin        | ADMIN only   | Admin-level content      |

---

## How JWT Works in This App

1. User registers/logs in → backend returns a JWT token
2. Frontend stores token in `localStorage`
3. Axios interceptor attaches `Authorization: Bearer <token>` to every request
4. Spring Security's `JwtAuthFilter` validates the token on each request
5. Role-based access is enforced via `SecurityConfig` and Spring's `@EnableMethodSecurity`

---

## Roles

| Role  | Can Access             |
|-------|------------------------|
| USER  | /api/public, /api/user |
| ADMIN | All endpoints          |

---

## Test Users (register via UI or Swagger)

You can register test accounts via the Register page:
- **USER**: `user@test.com` / `123456` / Role: USER
- **ADMIN**: `admin@test.com` / `123456` / Role: ADMIN

---

## Tech Stack Details

### Backend
- **Spring Security** secures endpoints with JWT stateless sessions
- **MapStruct** maps `RegisterRequest` DTO → `User` entity
- **Lombok** reduces boilerplate (getters, setters, constructors)
- **Swagger/OpenAPI** documents all APIs at `/swagger-ui.html`
- **BCrypt** encodes passwords before storing

### Frontend
- **React Hook Form** handles form state and validation
- **React Query** manages server state (QueryClientProvider wrapping)
- **Axios interceptors** auto-attach JWT and handle 401 redirects
- **React Router** protects routes via `ProtectedRoute` component
- **TailwindCSS** handles all styling
