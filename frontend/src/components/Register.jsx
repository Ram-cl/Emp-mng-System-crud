import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import DepartmentService from '../services/DepartmentService';

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "EMPLOYEE",
    name: "",
    email: "",
    phone: "",
    designation: "",
    salary: "",
    deptId: ""
  });
  
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    DepartmentService.getAllDepartments()
      .then(res => {
        const depts = res.data || [];
        setDepartments(depts);
        if (depts.length > 0 && depts[0]?.id) {
          setFormData(prev => ({ ...prev, deptId: depts[0].id.toString() }));
        }
      })
      .catch(err => {
        console.error("Error fetching departments", err);
        setDepartments([]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!formData.username || !formData.password) {
      setError("Username and password are required.");
      setLoading(false);
      return;
    }

    if (formData.role === "EMPLOYEE") {
      if (!formData.name || !formData.email || !formData.phone || !formData.designation || !formData.salary || !formData.deptId) {
        setError("All employee profile fields are required.");
        setLoading(false);
        return;
      }
    }

    const payload = {
      username: formData.username,
      password: formData.password,
      role: formData.role,
      ...(formData.role === "EMPLOYEE" ? {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        designation: formData.designation,
        salary: parseFloat(formData.salary),
        deptId: parseInt(formData.deptId)
      } : {})
    };

    AuthService.register(payload)
      .then(res => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch(err => {
        const errorMsg = err.response?.data?.message || "Registration failed. Username or email may already exist.";
        setError(errorMsg);
        setLoading(false);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', paddingTop: '40px', paddingBottom: '40px' }}>
      <div className='glass-panel premium-card' style={{ width: '100%', maxWidth: '500px' }}>
        <h3 className='premium-card-title'>Create Account</h3>

        {success && (
          <div className="text-success" style={{ textAlign: 'center', marginBottom: '15px', fontWeight: '500' }}>
            Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="modern-label">Username</label>
            <input 
              type="text" 
              name="username"
              className='modern-input' 
              autoComplete='off'
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username" 
            />
          </div>

          <div className="form-group">
            <label className="modern-label">Password</label>
            <input 
              type="password" 
              name="password"
              className='modern-input'
              value={formData.password}
              onChange={handleChange}
              placeholder="Choose a password" 
            />
          </div>

          <div className="form-group">
            <label className="modern-label">Account Role</label>
            <select 
              name="role"
              className="modern-input"
              value={formData.role}
              onChange={handleChange}
              style={{ background: 'var(--input-bg)', color: 'var(--text-main)' }}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin / Manager</option>
            </select>
          </div>

          {formData.role === "EMPLOYEE" && (
            <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', color: 'var(--accent)' }}>Employee Details</h4>
              
              <div className="form-group">
                <label className="modern-label">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  className="modern-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="form-group">
                <label className="modern-label">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className="modern-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                />
              </div>

              <div className="form-group">
                <label className="modern-label">Phone Number</label>
                <input 
                  type="text" 
                  name="phone" 
                  className="modern-input"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +1234567890"
                />
              </div>

              <div className="form-group">
                <label className="modern-label">Department</label>
                <select 
                  name="deptId" 
                  className="modern-input"
                  value={formData.deptId}
                  onChange={handleChange}
                  style={{ background: 'var(--input-bg)', color: 'var(--text-main)' }}
                >
                  {departments.length === 0 ? (
                    <option value="">No departments available. Create one first or register as Admin.</option>
                  ) : (
                    departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.deptName}</option>
                    ))
                  )}
                </select>
              </div>

              <div className="form-group">
                <label className="modern-label">Designation</label>
                <input 
                  type="text" 
                  name="designation" 
                  className="modern-input"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                />
              </div>

              <div className="form-group">
                <label className="modern-label">Salary</label>
                <input 
                  type="number" 
                  name="salary" 
                  className="modern-input"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. 65000"
                />
              </div>
            </div>
          )}

          {error && <div className="text-danger" style={{ textAlign: 'center', marginBottom: '15px' }}>{error}</div>}

          <button type="submit" className='btn btn-primary w-100 mt-4' disabled={loading || success}> 
            {loading ? 'Creating account...' : 'Register'} 
          </button>
          
          <div className="text-center mt-3" style={{ color: 'var(--text-secondary)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: '500' }}>Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
