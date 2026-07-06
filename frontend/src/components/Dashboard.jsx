import React, { useState, useEffect } from 'react';
import DashboardService from '../services/DashboardService';

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    pendingLeaves: 0,
    approvedLeaves: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    DashboardService.getStats()
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading dashboard statistics", err);
        setError("Could not load dashboard statistics.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading stats...</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 className='premium-card-title' style={{ textAlign: 'left', marginBottom: '10px' }}>
        Dashboard
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
        Welcome back, Manager! Here is a summary of your organization's activity.
      </p>

      {error && (
        <div className="text-danger" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '20px' 
      }}>
        {/* Total Employees */}
        <div className="glass-panel" style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            background: 'var(--primary)',
            filter: 'blur(50px)',
            opacity: 0.3
          }} />
          <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Total Employees
          </h4>
          <p style={{ fontSize: '3rem', fontWeight: '700', marginTop: '10px', background: 'linear-gradient(to right, #fff, var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {stats.totalEmployees}
          </p>
        </div>

        {/* Total Departments */}
        <div className="glass-panel" style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            background: 'var(--accent)',
            filter: 'blur(50px)',
            opacity: 0.3
          }} />
          <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Departments
          </h4>
          <p style={{ fontSize: '3rem', fontWeight: '700', marginTop: '10px', background: 'linear-gradient(to right, #fff, var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {stats.totalDepartments}
          </p>
        </div>

        {/* Pending Leaves */}
        <div className="glass-panel" style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            background: 'var(--warning)',
            filter: 'blur(50px)',
            opacity: 0.3
          }} />
          <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Pending Leaves
          </h4>
          <p style={{ fontSize: '3rem', fontWeight: '700', marginTop: '10px', color: 'var(--warning)' }}>
            {stats.pendingLeaves}
          </p>
        </div>

        {/* Approved Leaves */}
        <div className="glass-panel" style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            background: 'var(--success)',
            filter: 'blur(50px)',
            opacity: 0.3
          }} />
          <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Approved Leaves
          </h4>
          <p style={{ fontSize: '3rem', fontWeight: '700', marginTop: '10px', color: 'var(--success)' }}>
            {stats.approvedLeaves}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
