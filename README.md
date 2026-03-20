# 🧩 Task Management System

A full-stack Task Management System built as part of a recruiter evaluation. This application allows users to securely manage their personal tasks with authentication, filtering, search, and pagination features.

---

## 🚀 Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT (Access + Refresh Tokens)
* bcrypt (password hashing)
* Zod (validation)

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Axios
* React Hook Form
* Zod
* Sonner (toast notifications)

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT-based Authentication
* Access Token (short-lived)
* Refresh Token (long-lived)
* Secure Logout

### 📋 Task Management

* Create Task
* View Tasks
* Update Task
* Delete Task
* Toggle Task Status

### 🔍 Advanced Features

* Pagination
* Filter by Status (Pending / Completed)
* Search by Title
* Protected Routes
* Auto Token Refresh

### 💻 UI/UX

* Responsive Design (Mobile + Desktop)
* Toast Notifications
* Clean Dashboard UI

---

## 📁 Project Structure

```
task-management-system/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   └── task/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── server.ts
│   ├── prisma/
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   └── package.json
│
├── README.md
└── TESTING.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/task_management_db?schema=public
PORT=5000
NODE_ENV=development

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```

---

## 🛠️ Backend Setup

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 🛠️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔌 API Endpoints

### Auth

* `POST /auth/register`
* `POST /auth/login`
* `POST /auth/refresh`
* `POST /auth/logout`

### Tasks

* `GET /tasks` (pagination, filter, search)
* `POST /tasks`
* `GET /tasks/:id`
* `PATCH /tasks/:id`
* `DELETE /tasks/:id`
* `PATCH /tasks/:id/toggle`

---

## 🧪 Testing Summary

All core functionalities have been tested:

* Authentication flows (Register, Login, Logout, Refresh)
* Protected routes
* Task CRUD operations
* Pagination, filtering, and search
* Error handling scenarios
* Responsive UI across devices

Detailed test cases are available in `TESTING.md`.

---

## 🔐 Authentication Flow

1. User logs in → receives access + refresh token
2. Access token used for API requests
3. On expiry → refresh token generates new access token
4. Logout invalidates refresh token

---

## 📊 Task Flow

* Tasks are user-specific
* Users can:
  * Add tasks
  * Edit tasks
  * Delete tasks
  * Toggle status
* Tasks support:
  * Pagination
  * Filtering
  * Search

---

## 🧠 Design Principles

* Modular backend architecture
* Clean separation of concerns
* Centralized error handling
* Scalable folder structure
* Type-safe development using TypeScript
* Industry-standard authentication system

---

## 🚀 Future Improvements

* Role-based access control (RBAC)
* Task deadlines & reminders
* Drag-and-drop task management
* Dark mode
* Unit & integration tests (Jest)
* Deployment (Docker + Cloud)

---

## 👨‍💻 Author

Developed as part of a Full-Stack Engineer assessment.

---

## 📌 Notes

This project follows industry-level practices including:

* Secure authentication
* Scalable architecture
* Clean code structure
* Proper validation & error handling

---
