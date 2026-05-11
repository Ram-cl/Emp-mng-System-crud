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
        <Link to='/' className='navbar-brand'> EMS </Link>
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
