import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
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
            
            <div className="text-center mt-3" style={{ color: 'var(--text-secondary)' }}>
                Don't have an account? <Link to="/register" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: '500' }}>Sign Up</Link>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Login
