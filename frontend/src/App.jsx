import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import CreateEmployee from "./components/CreateEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import './App.css';
import EmployeeList from "./components/EmployeeList";

function PrivateRoute({ children }) 
{
  return localStorage.getItem("logged") ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      
      <main className="main-content">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          {/* protected pages */ }
          <Route path="/" element={<PrivateRoute><EmployeeList/></PrivateRoute>}/>
          <Route path="/add-emp" element={<PrivateRoute><CreateEmployee/></PrivateRoute>}/>
          <Route path="/update-emp/:id" element={<PrivateRoute><UpdateEmployee/></PrivateRoute>}/>
        </Routes>
      </main>

      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;