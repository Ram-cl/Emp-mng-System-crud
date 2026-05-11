# Comprehensive Code Edits Summary

Here are all the files that were modified to overhaul the design to a premium, glassmorphism aesthetic and fix the login backend connection issue:

## 1. Application Entry & Routing
Removed Bootstrap and wrapped the app in our new global layout.

```diff:main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
===
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```
```diff:App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
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
    <div className="bg-color">
    <BrowserRouter>
      <Header />

      <Routes>

        <Route exact path="/login" element={<Login />} />
        {/* protected pages */ }
        <Route path="/" element={<PrivateRoute><EmployeeList/></PrivateRoute>}/>
        <Route path="/add-emp" element={<PrivateRoute><CreateEmployee/></PrivateRoute>}/>
        <Route path="/update-emp/:id" element={<PrivateRoute><UpdateEmployee/></PrivateRoute>}/>
      </Routes>

      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
===
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
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
```

## 2. Design System (CSS)
Replaced the base CSS to introduce the dark-mode glassmorphism theme, modern typography, and updated component-specific classes.

```diff:index.css
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --border: #e5e4e7;
  --code-bg: #f4f3ec;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
  --shadow:
    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;

  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    --border: #2e303a;
    --code-bg: #1f2028;
    --accent: #c084fc;
    --accent-bg: rgba(192, 132, 252, 0.15);
    --accent-border: rgba(192, 132, 252, 0.5);
    --social-bg: rgba(47, 48, 58, 0.5);
    --shadow:
      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
  }

  #social .button-icon {
    filter: invert(1) brightness(2);
  }
}

body {
  margin: 0;
}

#root {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  border-inline: 1px solid var(--border);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

h1,
h2 {
  font-family: var(--heading);
  font-weight: 500;
  color: var(--text-h);
}

h1 {
  font-size: 56px;
  letter-spacing: -1.68px;
  margin: 32px 0;
  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 20px 0;
  }
}
h2 {
  font-size: 24px;
  line-height: 118%;
  letter-spacing: -0.24px;
  margin: 0 0 8px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
}
p {
  margin: 0;
}

code,
.counter {
  font-family: var(--mono);
  display: inline-flex;
  border-radius: 4px;
  color: var(--text-h);
}

code {
  font-size: 15px;
  line-height: 135%;
  padding: 4px 8px;
  background: var(--code-bg);
}
===
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --bg-color: #0b0f19;
  --bg-gradient: linear-gradient(135deg, #0b0f19 0%, #1a1b4b 100%);
  --surface: rgba(25, 30, 45, 0.7);
  --surface-hover: rgba(40, 45, 70, 0.8);
  --surface-border: rgba(255, 255, 255, 0.1);
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --secondary: #ec4899;
  --accent: #06b6d4;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --danger: #ef4444;
  --danger-hover: #dc2626;
  --success: #10b981;
  --success-hover: #059669;
  --warning: #f59e0b;
  --warning-hover: #d97706;
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  --input-bg: rgba(15, 23, 42, 0.6);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--bg-gradient);
  background-attachment: fixed;
  color: var(--text-main);
  min-height: 100vh;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

ul {
  list-style: none;
  padding: 0;
}

button {
  cursor: pointer;
  border: none;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

/* Glassmorphism utility classes */
.glass-panel {
  background: var(--surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  box-shadow: var(--glass-shadow);
}

.glass-button {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-main);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

/* Global Layout */
#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 100px 20px 60px; /* space for fixed header and footer */
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Modern inputs */
.modern-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--input-bg);
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  color: var(--text-main);
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

.modern-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.modern-label {
  display: block;
  margin-bottom: 6px;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
}

/* Base Buttons */
.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:active {
  transform: scale(0.96);
}

.btn-primary {
  background: var(--primary);
  color: white;
}
.btn-primary:hover {
  background: var(--primary-hover);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.btn-secondary {
  background: var(--surface);
  border: 1px solid var(--surface-border);
  color: var(--text-main);
}
.btn-secondary:hover {
  background: var(--surface-hover);
}

.btn-danger {
  background: var(--danger);
  color: white;
}
.btn-danger:hover {
  background: var(--danger-hover);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

.btn-success {
  background: var(--success);
  color: white;
}
.btn-success:hover {
  background: var(--success-hover);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.btn-warning {
  background: var(--warning);
  color: white;
}
.btn-warning:hover {
  background: var(--warning-hover);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
}

/* Utilities */
.text-center { text-align: center; }
.text-danger { color: var(--danger); font-size: 0.85rem; margin-top: 4px; display: block;}
.w-100 { width: 100%; }
.mt-4 { margin-top: 1.5rem; }
.mb-4 { margin-bottom: 1.5rem; }
.ms-3 { margin-left: 1rem; }
.me-3 { margin-right: 1rem; }
.py-4 { padding-top: 1.5rem; padding-bottom: 1.5rem; }

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2); 
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2); 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3); 
}

```
```diff:App.css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}
.footer
{
  position: absolute;
  bottom: 0;
  text-align: center;
  background-color: #ecf0f1;
  width: 100%;
  height:35px;
  line-height: 40px;
}
.bg-color
{
  height:100vh;
  background: linear-gradient(cyan,blue);
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
===
/* App specific overrides */

/* Navigation Header */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--surface-border);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Footer */
.footer {
  text-align: center;
  padding: 20px 0;
  background: rgba(15, 23, 42, 0.8);
  border-top: 1px solid var(--surface-border);
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: auto;
}

/* Data Table Grid */
.premium-table-container {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid var(--surface-border);
  background: var(--surface);
  box-shadow: var(--glass-shadow);
  margin-top: 2rem;
}

.premium-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.premium-table th, 
.premium-table td {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.premium-table th {
  background: rgba(0,0,0,0.2);
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.premium-table tbody tr {
  transition: all 0.2s ease;
}

.premium-table tbody tr:hover {
  background: rgba(255,255,255,0.03);
}

.premium-table tbody tr:last-child td {
  border-bottom: none;
}

/* Cards (Login, Forms) */
.premium-card {
  max-width: 500px;
  margin: 0 auto;
  padding: 40px;
  animation: fadeIn 0.5s ease-out;
}

.premium-card-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  background: linear-gradient(to right, #fff, var(--text-muted));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form-group {
  margin-bottom: 20px;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.actions-cell {
  display: flex;
  gap: 10px;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animated-title {
  display: inline-block;
  min-width: 250px;
}

```

## 3. Global Components
Updated the navigation bar and footer to match the modern styling.

```diff:Header.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Header() 
{

  const navigate = useNavigate();

  const handleLogout = (e)=>{
    e.preventDefault();
    localStorage.removeItem("logged");
    navigate("/login");
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light fixed-top'>
        <div className='container'>
            <Link to='/' className='navbar-brand fw-bold'> BridgeSoft </Link>
            {
                localStorage.getItem("logged") && 
                <button className='btn btn-primary' onClick={handleLogout}>
                    Logout
                </button>
            }
        </div>
    </nav>
  )
}

export default Header;
===
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Header() 
{
  const navigate = useNavigate();

  const handleLogout = (e)=>{
    e.preventDefault();
    localStorage.removeItem("logged");
    navigate("/login");
  }

  return (
    <nav className='navbar'>
        <Link to='/' className='navbar-brand'> BridgeSoft </Link>
        <div className="nav-links">
            {
                localStorage.getItem("logged") && 
                <button className='btn btn-secondary' onClick={handleLogout}>
                    Logout
                </button>
            }
        </div>
    </nav>
  )
}

export default Header;
```
```diff:Footer.jsx
import React from 'react'
import '../App.css';
function Footer() {
  return (
    <div>
        <small className='footer'> &copy; All Right Reserved - 2025</small>
    </div>
  )
}

export default Footer
===
import React from 'react'

function Footer() {
  return (
    <footer className='footer'>
        <small> &copy; All Right Reserved - {new Date().getFullYear()}</small>
    </footer>
  )
}

export default Footer

```

## 4. Main Views & Forms
Completely redesigned the authentication interface, data grid, and the forms used to create/update employees.

```diff:Login.jsx
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';


function Login() 
{
  const [user,setUser] = useState({username:"",password:""});
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit=(e)=>{
      e.preventDefault();

      AuthService.login(user).then(res=>{
        if(res.data === true)
        {
            localStorage.setItem("logged","true");
            navigate("/");
        }
        else
        {
          setError("Invalid Username or Password");
        }
      })
  }

  return (
    <div className='mt-5 pt-5'>
        <div className='card p-5 w-50 offset-3'>
          <h3 className='text-center'> Login </h3>

          <form>
            <label>UserName:</label>
            <input type="text" className='form-control' autoComplete='off'
            value={user.username}
            onChange={(e)=> setUser({...user,username:e.target.value})}/>

            <label>Password:</label>
            <input type="password" className='form-control'
            value={user.password}
            onChange={(e)=> setUser({...user,password:e.target.value})}/>

            {error  && <small className="text-danger">{error}</small>}

            <button className='btn btn-primary w-100 mt-4'
            onClick={handleSubmit}> Login </button>
          </form>
        </div>
    </div>
  )
}

export default Login
===
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function Login() 
{
  const [user,setUser] = useState({username:"",password:""});
  const [error,setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit=(e)=>{
      e.preventDefault();
      setLoading(true);
      setError("");

      AuthService.login(user).then(res=>{
        if(res.data === true)
        {
            localStorage.setItem("logged","true");
            navigate("/");
        }
        else
        {
          setError("Invalid Username or Password");
          setLoading(false);
        }
      }).catch(err => {
        setError("Login failed. Check connection.");
        setLoading(false);
      });
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className='glass-panel premium-card' style={{ width: '100%', maxWidth: '400px' }}>
          <h3 className='premium-card-title'>Welcome Back</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="modern-label">Username</label>
                <input type="text" className='modern-input' autoComplete='off'
                value={user.username}
                onChange={(e)=> setUser({...user,username:e.target.value})}
                placeholder="Enter your username" />
            </div>

            <div className="form-group">
                <label className="modern-label">Password</label>
                <input type="password" className='modern-input'
                value={user.password}
                onChange={(e)=> setUser({...user,password:e.target.value})}
                placeholder="Enter your password" />
            </div>

            {error && <div className="text-danger" style={{textAlign: 'center', marginBottom: '15px'}}>{error}</div>}

            <button type="submit" className='btn btn-primary w-100 mt-4' disabled={loading}> 
               {loading ? 'Authenticating...' : 'Sign In'} 
            </button>
          </form>
        </div>
    </div>
  )
}

export default Login
```
```diff:EmployeeList.jsx
import React from 'react'
import {useTypewriter,Cursor} from 'react-simple-typewriter';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
function EmployeeList() 
{
  const [employees,setEmployees] = useState([]);
  const navigate = useNavigate();

  const [value] = useTypewriter({
    words : ["Details","Information","List"],
    loop: true,
    typeSpeed : 80,
    deleteSpeed : 120
  })

  useEffect(()=>{
    EmployeeService.getAllEmployees().then(res =>{
        setEmployees(res.data);
    })
  },[]);

  const deleteEmployee =(id)=>{
        EmployeeService.deleteEmployee(id).then(res=>{
            EmployeeService.getAllEmployees().then(res=>{
                setEmployees(res.data);
            })
            .catch(error=>{
                console.log(error);
            })
        })
    } 



  return (
    <div className='mt-5'>
        <h3 className='mt-5 text-center pt-3'>Employee {value} <Cursor/> </h3> 
        <div className='container mt-5'>
        <Link to="/add-emp" className='btn btn-secondary w-25 mb-2'> Add Employee </Link>    
        <table className='table table-bordered table-striped'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>DOJ</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(emp =>{
                       return  <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.doj}</td>
                                    <td>{emp.dept.deptName}</td>
                                    <td>{emp.dept.designation}</td>
                                    <td>
                                        <button type="button" className='btn btn-warning' onClick={()=> navigate(`/update-emp/${emp.id}`)}>update</button>
                                        <button className='btn btn-danger ms-3' onClick={()=> deleteEmployee(emp.id)}> delete </button>
                                    </td>
                                </tr>
                    })   
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default EmployeeList
===
import React from 'react'
import {useTypewriter,Cursor} from 'react-simple-typewriter';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function EmployeeList() 
{
  const [employees,setEmployees] = useState([]);
  const navigate = useNavigate();

  const [value] = useTypewriter({
    words : ["Details","Information","List"],
    loop: true,
    typeSpeed : 80,
    deleteSpeed : 120
  })

  useEffect(()=>{
    EmployeeService.getAllEmployees().then(res =>{
        setEmployees(res.data);
    })
  },[]);

  const deleteEmployee =(id)=>{
        EmployeeService.deleteEmployee(id).then(res=>{
            EmployeeService.getAllEmployees().then(res=>{
                setEmployees(res.data);
            })
            .catch(error=>{
                console.log(error);
            })
        })
    } 

  return (
    <div className='mt-5'>
        <h3 className='animated-title'>Employee {value} <Cursor/> </h3> 
        
        <div className="flex-between">
            <p style={{color: 'var(--text-muted)'}}>Manage your organization's workforce</p>
            <Link to="/add-emp" className='btn btn-success'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Add Employee
            </Link>    
        </div>

        <div className='premium-table-container'>
            <table className='premium-table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>DOJ</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(emp =>{
                           return  <tr key={emp.id}>
                                        <td><span style={{color: 'var(--primary)', fontWeight: 'bold'}}>#{emp.id}</span></td>
                                        <td style={{fontWeight: '500'}}>{emp.name}</td>
                                        <td>{emp.doj}</td>
                                        <td><span className="glass-button" style={{fontSize: '0.8rem', padding: '4px 8px'}}>{emp.dept.deptName}</span></td>
                                        <td>{emp.dept.designation}</td>
                                        <td>
                                            <div className="actions-cell">
                                                <button type="button" className='btn btn-secondary' style={{padding: '6px 12px', fontSize: '0.85rem'}} onClick={()=> navigate(`/update-emp/${emp.id}`)}>Edit</button>
                                                <button className='btn btn-danger' style={{padding: '6px 12px', fontSize: '0.85rem'}} onClick={()=> deleteEmployee(emp.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                        })   
                    }
                    {employees.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-4" style={{color: 'var(--text-muted)'}}>
                                No employees found. Start by adding a new one.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default EmployeeList

```
```diff:CreateEmployee.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import EmployeeService from "../services/EmployeeService";
function CreateEmployee() 
{

    const navigate = useNavigate();

    const [employees,setEmployees]=useState({
        name:"",
        doj:"",
        dept:{
            deptName:"",
            designation:""
        }
    })

    const [errors,setErrors]=useState({
        name:"",
        doj:"",
        deptName:"",
        designation:""
    })

    const handleChange=(e)=>{
        e.preventDefault();
        const {name,value}=e.target;
        if(name=="name" || name=="doj")
        {
               setEmployees({...employees,[name]:value}); 
        }
        else
        {
            setEmployees({...employees,dept:{...employees.dept,[name]:value}});
        }

        setErrors({...errors,[name]:""});
    }

    const handleCancel=(e)=>{
        e.preventDefault();
        navigate("/");
    }

     const dateFormat=(date)=>{
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2,"0");
        const month = String(d.getMonth()+1).padStart(2,"0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    }



    const handleSubmit=(e)=>{
        e.preventDefault();
        if(validate())
        {
            const formattedDate = dateFormat(employees.doj);
            const employeeData=
            {
                ...employees,doj:formattedDate
            } 

            EmployeeService.addEmployee(employeeData).then(res=>{
                navigate("/");
            })

        }
    }

    const validate=(e)=>{
        const formErrors = {};
        let isValid=true;

        if(!employees.name)
        {
            formErrors.name="Name is mandatory";
            isValid=false;
        }
        if(!employees.doj)
        {
            formErrors.doj="Date is mandatory";
            isValid=false;
        }
        if(!employees.dept.deptName)
        {
            formErrors.deptName="Department name is mandatory";
            isValid=false;
        }
        if(!employees.dept.designation)
        {
            formErrors.designation="Designation is mandatory";
            isValid=false;
        }
        setErrors(formErrors);
        return isValid;
    }


  return (
    <div className="mt-5">
        <div className="container pt-3">
        <div className="card w-50 offset-3 p-3">
               <h5 className="text-center py-3"> Add Employees </h5>
               <form>
                    <label>Name:</label>
                    <input type="text" id="name" name="name" className="form-control"
                    value={employees.name}
                    onChange={handleChange}/>
                    {errors.name && <small className="text-danger"> {errors.name}</small>}
                    <br/>

                    <label>DOJ:</label>
                    <input type="date" id="doj" name="doj" className="form-control"
                    value={employees.doj}
                    onChange={handleChange}/>
                    {errors.doj && <small className="text-danger"> {errors.doj}</small>}
                    <br/>

                    <label>Department:</label>
                    <input type="text" id="deptName" name="deptName" className="form-control"
                    value={employees.dept.deptName}
                    onChange={handleChange}/>
                    {errors.deptName && <small className="text-danger"> {errors.deptName}</small>}
                    <br/>

                    <label>Designation:</label>
                    <input type="text" id="designation" name="designation" className="form-control"
                    value={employees.dept.designation}
                    onChange={handleChange}/>
                    {errors.designation && <small className="text-danger"> {errors.designation}</small>}
                    <br/>

                    <button className="btn btn-danger mt-3" onClick={handleCancel}> cancel </button>
                    <button className="btn btn-success mt-3 float-end" onClick={handleSubmit}> submit </button>
               </form>
        </div>
        </div>
    </div>
  )
}

export default CreateEmployee
===
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import EmployeeService from "../services/EmployeeService";

function CreateEmployee() 
{
    const navigate = useNavigate();

    const [employees,setEmployees]=useState({
        name:"",
        doj:"",
        dept:{
            deptName:"",
            designation:""
        }
    })

    const [errors,setErrors]=useState({
        name:"",
        doj:"",
        deptName:"",
        designation:""
    })

    const handleChange=(e)=>{
        e.preventDefault();
        const {name,value}=e.target;
        if(name==="name" || name==="doj")
        {
               setEmployees({...employees,[name]:value}); 
        }
        else
        {
            setEmployees({...employees,dept:{...employees.dept,[name]:value}});
        }

        setErrors({...errors,[name]:""});
    }

    const handleCancel=(e)=>{
        e.preventDefault();
        navigate("/");
    }

     const dateFormat=(date)=>{
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2,"0");
        const month = String(d.getMonth()+1).padStart(2,"0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(validate())
        {
            const formattedDate = dateFormat(employees.doj);
            const employeeData=
            {
                ...employees,doj:formattedDate
            } 

            EmployeeService.addEmployee(employeeData).then(res=>{
                navigate("/");
            })
        }
    }

    const validate=()=>{
        const formErrors = {};
        let isValid=true;

        if(!employees.name) { formErrors.name="Name is mandatory"; isValid=false; }
        if(!employees.doj) { formErrors.doj="Date is mandatory"; isValid=false; }
        if(!employees.dept.deptName) { formErrors.deptName="Department name is mandatory"; isValid=false; }
        if(!employees.dept.designation) { formErrors.designation="Designation is mandatory"; isValid=false; }
        setErrors(formErrors);
        return isValid;
    }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
        <div className="glass-panel premium-card" style={{ width: '100%', maxWidth: '600px' }}>
            <h3 className="premium-card-title">Add New Employee</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="modern-label">Full Name</label>
                    <input type="text" id="name" name="name" className="modern-input"
                    value={employees.name}
                    onChange={handleChange}
                    placeholder="e.g. Jane Doe" />
                    {errors.name && <small className="text-danger"> {errors.name}</small>}
                </div>

                <div className="form-group">
                    <label className="modern-label">Date of Joining</label>
                    <input type="date" id="doj" name="doj" className="modern-input"
                    value={employees.doj}
                    onChange={handleChange}/>
                    {errors.doj && <small className="text-danger"> {errors.doj}</small>}
                </div>

                <div className="form-group">
                    <label className="modern-label">Department</label>
                    <input type="text" id="deptName" name="deptName" className="modern-input"
                    value={employees.dept.deptName}
                    onChange={handleChange}
                    placeholder="e.g. Engineering" />
                    {errors.deptName && <small className="text-danger"> {errors.deptName}</small>}
                </div>

                <div className="form-group">
                    <label className="modern-label">Designation</label>
                    <input type="text" id="designation" name="designation" className="modern-input"
                    value={employees.dept.designation}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer" />
                    {errors.designation && <small className="text-danger"> {errors.designation}</small>}
                </div>

                <div className="flex-between" style={{ marginTop: '40px' }}>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="btn btn-success">Save Employee</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateEmployee
```
```diff:UpdateEmployee.jsx
import {useNavigate,useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import EmployeeService from '../services/EmployeeService';

function UpdateEmployee() 
{
  let navigate = useNavigate();
  const {id} = useParams();

  const [name,setName] = useState("");
  const [doj,setDoj] = useState("");
  const [department,setDepartment]= useState({deptName:"",designation:""});
  const [statusMessage,setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = (e)=>{
    e.preventDefault();
    navigate("/");
  }

  const dateFormat=(date)=>{
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2,"0");
    const month = String(d.getMonth()+1).padStart(2,"0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const parseBackendDateForInput=(dateString)=>{
    if (!dateString) return "";
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;

    const [day, month, year] = parts;
    return `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;
  }

  useEffect(()=>{
    setLoading(true);
    EmployeeService.getEmployeeById(id).then(res=>{
        setName(res.data.name || "");
        setDoj(parseBackendDateForInput(res.data.doj || ""));
        setDepartment({
          deptName: res.data?.dept?.deptName || "",
          designation: res.data?.dept?.designation || ""
        });
    }).catch(error => {
      console.error('Failed to load employee', error);
      setStatusMessage('Failed to load employee data.');
    }).finally(()=>{
      setLoading(false);
    });
  },[id])

  const handleUpdate=async(e)=>{
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    if (!name || !doj || !department.deptName || !department.designation) {
      setStatusMessage('All fields are required.');
      setLoading(false);
      return;
    }

    const formattedDate = dateFormat(doj);
    const updateEmployee={
      name,
      doj: formattedDate,
      dept:{
          deptName: department.deptName,
          designation: department.designation
      }
    }

    try {
      console.debug('UpdateEmployee submitting id:', id, 'payload:', updateEmployee);
      await EmployeeService.updateEmployee(id,updateEmployee);
      navigate("/");
    } catch (error) {
      console.error('Update failed', error);
      setStatusMessage(`Update failed: ${error?.message || 'Check backend'}`);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="pt-5">
           <div className="container pt-5">
              <div className="card offset-3 w-50 p-3">
                  <h5 className="text-center">Update Employee</h5>
                  <form onSubmit={handleUpdate}> 
                  <label className="my-2">Name:</label>
                  <input type="text" name="name" id="name" className="form-control"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}/>

                  <label className="my-2">DOJ:</label>
                  <input type="date" name="doj" id="doj" className="form-control"
                  value={doj}
                  onChange={(e)=> setDoj(e.target.value)}/>

                  <label className="my-2">Department:</label>
                  <input type="text" name="deptName" id="deptName" className="form-control"
                  value={department.deptName}
                  onChange={(e)=> setDepartment({...department,deptName:e.target.value})}/>

                  <label className="my-2">Designation:</label>
                  <input type="text" name="designation" id="designation" className="form-control"
                  value={department.designation}
                  onChange={(e)=> setDepartment({...department,designation:e.target.value})}/>

                  {statusMessage && <div className="alert alert-warning mt-3">{statusMessage}</div>}

                  <button type="button" className="btn btn-danger w-25 mt-3 float-start" onClick={handleCancel}> cancel </button>
                  <button type="submit" className="btn btn-success w-25 mt-3 float-end" disabled={loading}>{loading ? 'Saving...' : 'submit'}</button>
                  </form> 
              </div>
           </div>
    </div>
  )
}

export default UpdateEmployee
===
import {useNavigate,useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import EmployeeService from '../services/EmployeeService';

function UpdateEmployee() 
{
  let navigate = useNavigate();
  const {id} = useParams();

  const [name,setName] = useState("");
  const [doj,setDoj] = useState("");
  const [department,setDepartment]= useState({deptName:"",designation:""});
  const [statusMessage,setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = (e)=>{
    e.preventDefault();
    navigate("/");
  }

  const dateFormat=(date)=>{
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2,"0");
    const month = String(d.getMonth()+1).padStart(2,"0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const parseBackendDateForInput=(dateString)=>{
    if (!dateString) return "";
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;

    const [day, month, year] = parts;
    return `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;
  }

  useEffect(()=>{
    setLoading(true);
    EmployeeService.getEmployeeById(id).then(res=>{
        setName(res.data.name || "");
        setDoj(parseBackendDateForInput(res.data.doj || ""));
        setDepartment({
          deptName: res.data?.dept?.deptName || "",
          designation: res.data?.dept?.designation || ""
        });
    }).catch(error => {
      console.error('Failed to load employee', error);
      setStatusMessage('Failed to load employee data.');
    }).finally(()=>{
      setLoading(false);
    });
  },[id])

  const handleUpdate=async(e)=>{
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    if (!name || !doj || !department.deptName || !department.designation) {
      setStatusMessage('All fields are required.');
      setLoading(false);
      return;
    }

    const formattedDate = dateFormat(doj);
    const updateEmployee={
      name,
      doj: formattedDate,
      dept:{
          deptName: department.deptName,
          designation: department.designation
      }
    }

    try {
      console.debug('UpdateEmployee submitting id:', id, 'payload:', updateEmployee);
      await EmployeeService.updateEmployee(id,updateEmployee);
      navigate("/");
    } catch (error) {
      console.error('Update failed', error);
      setStatusMessage(`Update failed: ${error?.message || 'Check backend'}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
        <div className="glass-panel premium-card" style={{ width: '100%', maxWidth: '600px' }}>
            <h3 className="premium-card-title">Update Employee Details</h3>
            
            <form onSubmit={handleUpdate}> 
                <div className="form-group">
                    <label className="modern-label">Full Name</label>
                    <input type="text" name="name" id="name" className="modern-input"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label className="modern-label">Date of Joining</label>
                    <input type="date" name="doj" id="doj" className="modern-input"
                    value={doj}
                    onChange={(e)=> setDoj(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label className="modern-label">Department</label>
                    <input type="text" name="deptName" id="deptName" className="modern-input"
                    value={department.deptName}
                    onChange={(e)=> setDepartment({...department,deptName:e.target.value})}/>
                </div>

                <div className="form-group">
                    <label className="modern-label">Designation</label>
                    <input type="text" name="designation" id="designation" className="modern-input"
                    value={department.designation}
                    onChange={(e)=> setDepartment({...department,designation:e.target.value})}/>
                </div>

                {statusMessage && <div className="text-danger" style={{marginTop: '15px'}}>{statusMessage}</div>}

                <div className="flex-between" style={{ marginTop: '40px' }}>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? 'Saving...' : 'Update Employee'}
                    </button>
                </div>
            </form> 
        </div>
    </div>
  )
}

export default UpdateEmployee
```

## 5. API Services (Bug Fix)
Updated the authentication service to correctly route through Vite's proxy instead of hitting a hardcoded port.

```diff:AuthService.jsx
import axios from 'axios';

const AUTH_API = "http://localhost:9191/api/auth/login";

class AuthService
{
    login(user)
    {
        return axios.post(AUTH_API,user);
    }
}
export default new AuthService();
===
import axios from 'axios';

const AUTH_API = "/api/auth/login";

class AuthService
{
    login(user)
    {
        return axios.post(AUTH_API,user);
    }
}
export default new AuthService();
```
