# Employee Management System (Frontend)

This is the frontend application for the Employee Management System. It provides a modern, responsive, and interactive user interface built with React and Vite. It connects seamlessly to the Spring Boot backend to perform CRUD operations and manage employee records.

## 🚀 Tech Stack

*   **React 19** (UI Library)
*   **Vite** (Build Tool & Dev Server)
*   **React Router DOM** (Routing/Navigation)
*   **Axios** (HTTP Client for API requests)
*   **React Simple Typewriter** (For dynamic text animations)
*   **CSS / Bootstrap** (Styling & Layout)

## ✨ Features

*   **Dashboard:** View all employees in a clean, tabular format.
*   **Real-time Search:** Filter employees instantly by typing their names.
*   **Employee Management:** Add new employees, update their details, or remove them from the system.
*   **Authentication UI:** Login and Registration screens for secure access.
*   **Dynamic UI Elements:** Includes glassmorphism design elements and typewriter animations for a premium feel.

## 📋 Prerequisites

To run this frontend locally, you need:
*   [Node.js](https://nodejs.org/) (Version 18 or higher recommended).
*   The **Spring Boot Backend** must be running simultaneously on port `3030`.

## ⚙️ Configuration

The application is configured to communicate with the backend API. 
In `src/services/EmployeeService.jsx`, the base API endpoint is set to:
```javascript
const EMPLOYEE_API = "/api/v1/employees";
```
*Note: Depending on your Vite proxy configuration, this connects to `http://localhost:3030`.*

## 🏃‍♂️ How to Run

1. Open your terminal or command prompt.
2. Navigate to the frontend directory:
   ```bash
   cd C:\Users\ramda\frontend
   ```
3. Install the dependencies (only needed the first time):
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## 📁 Folder Structure

*   `src/components/`: Contains all the React UI components (`EmployeeList`, `CreateEmployee`, `UpdateEmployee`, `Login`, etc.).
*   `src/services/`: Contains the Axios service classes (`EmployeeService`, `AuthService`) that handle all API requests to the backend.
*   `src/App.jsx`: The main layout and route configuration file.
*   `src/index.css` & `src/App.css`: Global styles and custom CSS for the premium design.

## 🛠️ Building for Production

To create a production-ready build, run:
```bash
npm run build
```
This will generate optimized files in the `dist` folder which can be deployed to any static web hosting service (like Netlify, Vercel, or AWS S3).
