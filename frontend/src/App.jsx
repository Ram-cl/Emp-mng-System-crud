import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import CreateEmployee from "./components/CreateEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import EmployeeList from "./components/EmployeeList";
import Dashboard from "./components/Dashboard";
import DepartmentList from "./components/DepartmentList";
import LeaveApprovals from "./components/LeaveApprovals";
import EmployeeLeaves from "./components/EmployeeLeaves";
import EmployeeProfile from "./components/EmployeeProfile";
import './App.css';

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("logged") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("logged") === "true";
  const role = localStorage.getItem("role");
  return isLoggedIn && role === "ADMIN" ? children : <Navigate to="/login" />;
}

function EmployeeRoute({ children }) {
  const isLoggedIn = localStorage.getItem("logged") === "true";
  const role = localStorage.getItem("role");
  return isLoggedIn && role === "EMPLOYEE" ? children : <Navigate to="/login" />;
}

function HomeRoute() {
  const isLoggedIn = localStorage.getItem("logged") === "true";
  if (!isLoggedIn) return <Navigate to="/login" />;
  
  const role = localStorage.getItem("role");
  return role === "ADMIN" ? <Dashboard /> : <EmployeeProfile />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            
            {/* Home Redirect Route */}
            <Route path="/" element={<HomeRoute />} />
            
            {/* Admin Protected Routes */}
            <Route path="/employees" element={<AdminRoute><EmployeeList /></AdminRoute>} />
            <Route path="/add-emp" element={<AdminRoute><CreateEmployee /></AdminRoute>} />
            <Route path="/update-emp/:id" element={<AdminRoute><UpdateEmployee /></AdminRoute>} />
            <Route path="/departments" element={<AdminRoute><DepartmentList /></AdminRoute>} />
            <Route path="/leave-approvals" element={<AdminRoute><LeaveApprovals /></AdminRoute>} />
            
            {/* Employee Protected Routes */}
            <Route path="/my-leaves" element={<EmployeeRoute><EmployeeLeaves /></EmployeeRoute>} />
            
            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;