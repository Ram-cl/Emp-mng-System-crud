import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("logged") === "true";
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear(); // Clear all session data
    navigate("/login");
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active-link' : '';
  };

  return (
    <nav className='navbar'>
      <Link to='/' className='navbar-brand'>EMS</Link>
      
      {isLoggedIn && (
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {role === "ADMIN" ? (
            <>
              <Link to="/" className={`nav-item ${isActive('/')}`}>Dashboard</Link>
              <Link to="/employees" className={`nav-item ${isActive('/employees')}`}>Employees</Link>
              <Link to="/departments" className={`nav-item ${isActive('/departments')}`}>Departments</Link>
              <Link to="/leave-approvals" className={`nav-item ${isActive('/leave-approvals')}`}>Leaves</Link>
            </>
          ) : (
            <>
              <Link to="/" className={`nav-item ${isActive('/')}`}>My Profile</Link>
              <Link to="/my-leaves" className={`nav-item ${isActive('/my-leaves')}`}>My Leaves</Link>
            </>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '10px' }}>
            <span style={{ 
              fontSize: '0.9rem', 
              color: 'var(--accent)', 
              fontWeight: '600',
              background: 'rgba(6, 182, 212, 0.1)',
              padding: '4px 10px',
              borderRadius: '12px',
              border: '1px solid rgba(6, 182, 212, 0.2)'
            }}>
              {username} ({role})
            </span>
            <button className='btn btn-secondary' style={{ padding: '6px 12px', fontSize: '0.9rem' }} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header;
