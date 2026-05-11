# Full Stack Employee Management System

This is a complete Full Stack Employee Management System. It features a robust REST API built with Spring Boot and a modern, interactive user interface built with React and Vite. 

---

## 🏗️ Architecture & Tech Stack

### Backend (Spring Boot)
*   **Java 17** & **Spring Boot 3.x**
*   **Spring Data JPA** (Hibernate)
*   **MySQL** (Database)
*   **Spring Security** (Authentication)
*   **SpringDoc OpenAPI (Swagger)** (API Documentation)

### Frontend (React)
*   **React 19** & **Vite**
*   **React Router DOM** (Navigation)
*   **Axios** (HTTP Client)
*   **React Simple Typewriter** (Animations)
*   **CSS / Bootstrap** (Styling & Layout)

---

## ✨ Features

*   **Employee Management:** Full CRUD operations (Create, Read, Update, Delete) for employee records.
*   **Real-time Search:** Filter employees instantly by typing their names without refreshing the page.
*   **Authentication:** Secure Login and Registration screens.
*   **Department Mapping:** Employees are assigned to specific departments and roles.
*   **Premium UI:** Glassmorphism design elements and typewriter animations for a modern feel.
*   **API Documentation:** Interactive Swagger UI to test backend endpoints directly from the browser.

---

## 📋 Prerequisites

To run this full stack project locally, you need:
1.  **Java Development Kit (JDK) 17** or higher.
2.  **Node.js** (Version 18 or higher recommended).
3.  **MySQL Server** running on your local machine.

---

## ⚙️ Backend Setup & Configuration

1. Open `src/main/resources/application.properties` in your Spring Boot project.
2. Ensure your MySQL credentials match your local setup:
   ```properties
   server.port = 3030
   spring.datasource.url= jdbc:mysql://localhost:3306/db
   spring.datasource.username= root
   spring.datasource.password= 12345678
   spring.jpa.hibernate.ddl-auto= update
   ```
3. Run the backend using Eclipse/STS (Run as Spring Boot App) or via command line:
   ```bash
   ./mvnw spring-boot:run
   ```
4. Once running, view the API Documentation at: 👉 **`http://localhost:3030/swagger-ui/index.html`**

---

## 💻 Frontend Setup & Configuration

1. Open your terminal or command prompt and navigate to your frontend directory.
   ```bash
   cd C:\Users\ramda\frontend
   ```
2. Install the required Node dependencies (only needed the first time):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

---

## 🛣️ Key API Endpoints (Backend)

*   `GET /api/v1/employees` - Retrieve all employees
*   `GET /api/v1/employees/{id}` - Retrieve a specific employee by ID
*   `GET /api/v1/employees/search?name={name}` - Search employees by name
*   `POST /api/v1/employees` - Create a new employee
*   `PUT /api/v1/employees/{id}` - Update an existing employee
*   `DELETE /api/v1/employees/{id}` - Delete an employee
*   `POST /api/auth/register` - Register a new user
*   `POST /api/auth/login` - Authenticate an existing user
