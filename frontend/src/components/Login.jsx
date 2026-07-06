import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!user.username || !user.password) {
      setError("Username and password are required.");
      setLoading(false);
      return;
    }

    AuthService.login(user)
      .then(res => {
        const { token, username, role, userId, employeeId } = res.data;
        
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
        if (employeeId) {
          localStorage.setItem("employeeId", employeeId);
        } else {
          localStorage.removeItem("employeeId");
        }
        localStorage.setItem("logged", "true");

        // Redirect based on role
        if (role === "ADMIN") {
          navigate("/");
        } else {
          navigate("/");
        }
      })
      .catch(err => {
        const errorMsg = err.response?.data?.message || "Invalid Username or Password";
        setError(errorMsg);
        setLoading(false);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className='glass-panel premium-card' style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className='premium-card-title'>Welcome Back</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="modern-label">Username</label>
            <input 
              type="text" 
              className='modern-input' 
              autoComplete='off'
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username" 
            />
          </div>

          <div className="form-group">
            <label className="modern-label">Password</label>
            <input 
              type="password" 
              className='modern-input'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password" 
            />
          </div>

          {error && <div className="text-danger" style={{ textAlign: 'center', marginBottom: '15px' }}>{error}</div>}

          <button type="submit" className='btn btn-primary w-100 mt-4' disabled={loading}> 
            {loading ? 'Authenticating...' : 'Sign In'} 
          </button>
          
          <div className="text-center mt-3" style={{ color: 'var(--text-secondary)' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: '500' }}>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
