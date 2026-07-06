import React, { useState, useEffect } from 'react';
import LeaveService from '../services/LeaveService';

function LeaveApprovals() {
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState("PENDING"); // "PENDING" or "ALL"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLeaves();
  }, [filter]);

  const loadLeaves = () => {
    setLoading(true);
    const apiCall = filter === "PENDING" ? LeaveService.getPendingLeaves() : LeaveService.getAllLeaves();
    
    apiCall
      .then(res => {
        setLeaves(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading leave requests", err);
        setError("Failed to load leave requests.");
        setLoading(false);
      });
  };

  const handleApprove = (id) => {
    LeaveService.approveLeave(id)
      .then(() => {
        loadLeaves();
      })
      .catch(err => {
        console.error("Error approving leave", err);
        setError("Failed to approve leave request.");
      });
  };

  const handleReject = (id) => {
    LeaveService.rejectLeave(id)
      .then(() => {
        loadLeaves();
      })
      .catch(err => {
        console.error("Error rejecting leave", err);
        setError("Failed to reject leave request.");
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
        Leave Approvals
      </h3>
      <p style={{ color: 'var(--text-muted)' }}>Review and approve employee leave requests</p>

      {error && (
        <div className="text-danger" style={{ margin: '15px 0' }}>
          {error}
        </div>
      )}

      {/* Filter Toggle */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', marginBottom: '20px' }}>
        <button 
          className={`btn ${filter === "PENDING" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setFilter("PENDING")}
          style={{ padding: '8px 16px', fontSize: '0.9rem' }}
        >
          Pending Approvals
        </button>
        <button 
          className={`btn ${filter === "ALL" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setFilter("ALL")}
          style={{ padding: '8px 16px', fontSize: '0.9rem' }}
        >
          All Request History
        </button>
      </div>

      {/* Table */}
      <div className="premium-table-container">
        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>Loading leave requests...</p>
        ) : (
          <table className="premium-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Designation</th>
                <th>Dates</th>
                <th>Reason</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(req => (
                <tr key={req.id}>
                  <td>
                    <div style={{ fontWeight: '600' }}>{req.employee?.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{req.employee?.email}</div>
                  </td>
                  <td>{req.employee?.designation}</td>
                  <td>
                    <div style={{ fontWeight: '500' }}>{req.startDate} to {req.endDate}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Applied: {req.appliedDate}
                    </div>
                  </td>
                  <td>{req.reason}</td>
                  <td>
                    <span 
                      className="glass-button" 
                      style={{ 
                        fontSize: '0.8rem', 
                        padding: '4px 8px',
                        cursor: 'default',
                        ...getStatusBadgeStyle(req.status)
                      }}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {req.status === 'PENDING' ? (
                      <div className="actions-cell" style={{ justifyContent: 'flex-end' }}>
                        <button 
                          className="btn btn-success" 
                          style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                          onClick={() => handleApprove(req.id)}
                        >
                          Approve
                        </button>
                        <button 
                          className="btn btn-danger" 
                          style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                          onClick={() => handleReject(req.id)}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Reviewed
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {leaves.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4" style={{ color: 'var(--text-muted)' }}>
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default LeaveApprovals;
