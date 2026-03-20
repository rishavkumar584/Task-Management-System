# 📘 Project Overview — Task Management System

---

## 🎯 Objective

The objective of this project is to build a **full-stack Task Management System** that allows users to securely manage their personal tasks.

The system focuses on:

* Secure authentication using JWT (Access + Refresh Tokens)
* Full CRUD operations on tasks
* Efficient data handling with pagination, filtering, and search
* Responsive and user-friendly web interface

This project is designed to demonstrate  **industry-level full-stack development practices** .

---

## 🏗️ Project Architecture

The application follows a  **client-server architecture** :

* **Frontend (Next.js)**
  Handles UI, user interactions, and API communication
* **Backend (Node.js + Express)**
  Handles business logic, authentication, and database operations
* **Database (PostgreSQL + Prisma ORM)**
  Stores users, tasks, and refresh tokens securely

### Architecture Flow

1. User interacts with frontend UI
2. Frontend sends API request to backend
3. Backend validates request and authenticates user
4. Backend interacts with database via Prisma
5. Response is returned to frontend
6. UI updates accordingly

---

## 🧩 Backend Modules

The backend is structured in a modular and scalable way.

### 1. Auth Module

Handles:

* User registration
* User login
* Token refresh
* Logout

Key features:

* Password hashing using bcrypt
* JWT-based authentication
* Refresh token storage in database

---

### 2. Task Module

Handles:

* Create task
* Get all tasks (with pagination, filtering, search)
* Get single task
* Update task
* Delete task
* Toggle task status

Each task is linked to a specific user.

---

### 3. Middleware Layer

Includes:

* Authentication middleware (protect routes)
* Error handling middleware
* 404 route handler

---

### 4. Utility Layer

Includes:

* JWT helper functions
* Password hashing utilities
* Common helpers

---

### 5. Configuration Layer

Includes:

* Environment variable management
* Prisma client setup

---

## 🎨 Frontend Modules

The frontend is built using Next.js App Router with a modular UI structure.

### 1. Authentication Pages

* Register Page
* Login Page

Features:

* Form validation using Zod
* API integration
* Token storage

---

### 2. Dashboard Page

Main application interface where users manage tasks.

Features:

* Task list display
* Add/Edit/Delete tasks
* Toggle task status
* Pagination controls
* Search and filter options

---

### 3. Components

Reusable UI components:

* TaskForm (create/edit tasks)
* TaskList (display tasks)
* Buttons, inputs, layouts

---

### 4. API Layer

* Axios instance for API calls
* Automatic token attachment
* Token refresh interceptor

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend returns:
   * Access Token (short-lived)
   * Refresh Token (long-lived)
3. Access token is stored in localStorage and used in API calls
4. On token expiry:
   * Refresh token is used to generate a new access token
5. Logout:
   * Refresh token is invalidated in database
   * Tokens are cleared from client

---

## 📋 Task Management Flow

1. User logs in and accesses dashboard
2. Dashboard fetches tasks from backend
3. User can:
   * Create a task
   * Edit a task
   * Delete a task
   * Toggle task status
4. Backend ensures:
   * Tasks belong only to logged-in user
5. Task list supports:
   * Pagination (page & limit)
   * Filtering by status
   * Searching by title

---

## 🛡️ Validation and Error Handling

### Validation

* Backend uses **Zod** for:
  * Request body validation
  * Query validation
  * Parameter validation
* Frontend uses **Zod + React Hook Form** for form validation

---

### Error Handling

* Standard HTTP status codes used:
  * 400 → Bad request
  * 401 → Unauthorized
  * 404 → Not found
  * 409 → Conflict
  * 500 → Server error
* Centralized error middleware in backend
* User-friendly error messages in frontend (toasts)

---

## 🧪 Testing Overview

The project was tested thoroughly across all layers.

### Backend Testing

* Authentication flows (register, login, refresh, logout)
* Protected routes validation
* Task CRUD operations
* Edge cases (invalid input, unauthorized access)

---

### Frontend Testing

* Form validations
* API integrations
* Navigation and routing
* Dashboard functionality

---

### Functional Testing

* Pagination works correctly
* Filtering and search produce correct results
* Token refresh works seamlessly
* Logout clears session properly

---

### Responsive Testing

* Desktop view
* Tablet view
* Mobile view

---

## 📌 Summary

This project demonstrates:

* Full-stack development capability
* Secure authentication implementation
* Clean and scalable architecture
* Strong understanding of REST APIs
* Practical frontend-backend integration

It is built following  **industry best practices** , making it suitable for recruiter evaluation.

---
