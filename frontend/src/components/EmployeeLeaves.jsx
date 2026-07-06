import React, { useState, useEffect } from 'react';
import LeaveService from '../services/LeaveService';

function EmployeeLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    if (employeeId) {
      loadLeaves();
    } else {
      setError("No associated employee profile found to request leave.");
      setLoading(false);
    }
  }, [employeeId]);

  const loadLeaves = () => {
    setLoading(true);
    LeaveService.getLeavesByEmployeeId(employeeId)
      .then(res => {
        setLeaves(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading leaves", err);
        setError("Failed to load your leaves.");
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.startDate || !formData.endDate || !formData.reason.trim()) {
      setError("Please fill in all leave request fields.");
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start > end) {
      setError("Start date cannot be after end date.");
      return;
    }

    setSubmitting(true);
    const payload = {
      employee: {
        id: parseInt(employeeId)
      },
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason
    };

    LeaveService.applyLeave(payload)
      .then(() => {
        setSuccess("Leave request submitted successfully!");
        setFormData({ startDate: "", endDate: "", reason: "" });
        setSubmitting(false);
        loadLeaves();
      })
      .catch(err => {
        console.error("Error submitting leave request", err);
        setError("Failed to submit leave request.");
        setSubmitting(false);
      });
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'APPROVED':
        return { background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.2)' };
      case 'REJECTED':
        return { background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.2)' };
      default:
        return { background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', border: '1px solid rgba(245, 158, 11, 0.2)' };
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 className="animated-title" style={{ fontSize: '2rem', marginBottom: '10px' }}>
        My Leaves
      </h3>
      <p style={{ color: 'var(--text-muted)' }}>Submit leave requests and monitor status</p>

      {error && <div className="text-danger" style={{ margin: '15px 0' }}>{error}</div>}
      {success && <div className="text-success" style={{ margin: '15px 0', fontWeight: '500' }}>{success}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '20px' }}>
        
        {/* Submit Form */}
        <div className="glass-panel" style={{ padding: '25px', height: 'fit-content' }}>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', color: 'var(--accent)' }}>Request Leave</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="modern-label">Start Date</label>
              <input 
                type="date" 
                name="startDate"
                className="modern-input"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="modern-label">End Date</label>
              <input 
                type="date" 
                name="endDate"
                className="modern-input"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="modern-label">Reason</label>
              <textarea 
                name="reason"
                className="modern-input"
                rows="3"
                value={formData.reason}
                onChange={handleChange}
                placeholder="e.g. Medical checkup / Family event"
                style={{ resize: 'none', fontFamily: 'inherit' }}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-4" disabled={submitting || !employeeId}>
              {submitting ? "Submitting..." : "Apply Leave"}
            </button>
          </form>
        </div>

        {/* My Leaves List */}
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', color: 'var(--text-main)' }}>Leave Request History</h4>
          <div className="premium-table-container" style={{ marginTop: '0' }}>
            {loading ? (
              <p style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>Loading history...</p>
            ) : (
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Dates</th>
                    <th>Reason</th>
                    <th style={{ textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map(req => (
                    <tr key={req.id}>
                      <td>
                        <div style={{ fontWeight: '500' }}>{req.startDate} to {req.endDate}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Applied: {req.appliedDate}</div>
                      </td>
                      <td style={{ fontSize: '0.9rem' }}>{req.reason}</td>
                      <td style={{ textAlign: 'right' }}>
                        <span 
                          className="glass-button" 
                          style={{ 
                            fontSize: '0.75rem', 
                            padding: '4px 8px',
                            cursor: 'default',
                            ...getStatusBadgeStyle(req.status)
                          }}
                        >
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {leaves.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-4" style={{ color: 'var(--text-muted)' }}>
                        No leave history found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default EmployeeLeaves;
