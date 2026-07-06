import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';

function EmployeeProfile() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    if (!employeeId) {
      setError("No associated employee profile found for your user account. Please contact an Administrator.");
      setLoading(false);
      return;
    }

    EmployeeService.getEmployeeById(employeeId)
      .then(res => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading employee profile", err);
        setError("Failed to load your profile details.");
        setLoading(false);
      });
  }, [employeeId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
      <div className="glass-panel premium-card" style={{ width: '100%', maxWidth: '600px', padding: '40px' }}>
        
        {error ? (
          <div className="text-danger" style={{ textAlign: 'center', fontSize: '1rem' }}>{error}</div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '15px',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
              }}>
                {employee?.name ? employee.name.charAt(0).toUpperCase() : '?'}
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>{employee?.name}</h3>
              <p style={{ color: 'var(--accent)', fontWeight: '500' }}>{employee?.designation}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '25px' }}>
              <div>
                <label className="modern-label" style={{ marginBottom: '2px' }}>Email Address</label>
                <p style={{ fontSize: '1.05rem', fontWeight: '500' }}>{employee?.email}</p>
              </div>

              <div>
                <label className="modern-label" style={{ marginBottom: '2px' }}>Phone Number</label>
                <p style={{ fontSize: '1.05rem', fontWeight: '500' }}>{employee?.phone || 'N/A'}</p>
              </div>

              <div>
                <label className="modern-label" style={{ marginBottom: '2px' }}>Department</label>
                <p style={{ fontSize: '1.05rem', fontWeight: '500' }}>
                  <span className="glass-button" style={{ fontSize: '0.8rem', padding: '4px 8px', cursor: 'default' }}>
                    {employee?.dept?.deptName || 'N/A'}
                  </span>
                </p>
              </div>

              <div>
                <label className="modern-label" style={{ marginBottom: '2px' }}>Salary</label>
                <p style={{ fontSize: '1.05rem', fontWeight: '500' }}>${employee?.salary ? employee.salary.toLocaleString() : '0'}</p>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label className="modern-label" style={{ marginBottom: '2px' }}>Date of Joining</label>
                <p style={{ fontSize: '1.05rem', fontWeight: '500' }}>{employee?.doj}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EmployeeProfile;
