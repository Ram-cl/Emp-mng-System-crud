import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

function Register() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!user.username || !user.password) {
      setError("Username and password are required.");
      setLoading(false);
      return;
    }

    AuthService.register(user).then(res => {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }).catch(err => {
      setError("Registration failed. Username may already exist.");
      setLoading(false);
    });
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className='glass-panel premium-card' style={{ width: '100%', maxWidth: '400px' }}>
          <h3 className='premium-card-title'>Create Account</h3>

          {success && <div className="text-success" style={{textAlign: 'center', marginBottom: '15px', fontWeight: '500'}}>Registration successful! Redirecting to login...</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="modern-label">Username</label>
                <input type="text" className='modern-input' autoComplete='off'
                value={user.username}
                onChange={(e)=> setUser({...user,username:e.target.value})}
                placeholder="Choose a username" />
            </div>

            <div className="form-group">
                <label className="modern-label">Password</label>
                <input type="password" className='modern-input'
                value={user.password}
                onChange={(e)=> setUser({...user,password:e.target.value})}
                placeholder="Choose a password" />
            </div>

            {error && <div className="text-danger" style={{textAlign: 'center', marginBottom: '15px'}}>{error}</div>}

            <button type="submit" className='btn btn-primary w-100 mt-4' disabled={loading || success}> 
               {loading ? 'Creating account...' : 'Register'} 
            </button>
            
            <div className="text-center mt-3" style={{ color: 'var(--text-secondary)' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: '500' }}>Sign In</Link>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Register;
