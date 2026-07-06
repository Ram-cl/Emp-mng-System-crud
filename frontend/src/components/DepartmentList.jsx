import React, { useState, useEffect } from 'react';
import DepartmentService from '../services/DepartmentService';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [deptName, setDeptName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = () => {
    DepartmentService.getAllDepartments()
      .then(res => {
        setDepartments(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading departments", err);
        setError("Failed to load departments.");
        setLoading(false);
      });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!deptName.trim()) {
      setError("Department name cannot be empty.");
      return;
    }
    setError("");

    DepartmentService.createDepartment({ deptName })
      .then(() => {
        setDeptName("");
        loadDepartments();
      })
      .catch(err => {
        console.error("Error creating department", err);
        setError("Failed to create department.");
      });
  };

  const handleEditClick = (dept) => {
    setEditingId(dept.id);
    setEditName(dept.deptName);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleUpdate = (id) => {
    if (!editName.trim()) {
      setError("Department name cannot be empty.");
      return;
    }
    setError("");

    DepartmentService.updateDepartment(id, { deptName: editName })
      .then(() => {
        setEditingId(null);
        setEditName("");
        loadDepartments();
      })
      .catch(err => {
        console.error("Error updating department", err);
        setError("Failed to update department.");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      DepartmentService.deleteDepartment(id)
        .then(() => {
          loadDepartments();
        })
        .catch(err => {
          console.error("Error deleting department", err);
          setError("Failed to delete department. It may be linked to active employees.");
        });
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 className="animated-title" style={{ fontSize: '2rem', marginBottom: '10px' }}>
        Departments
      </h3>
      <p style={{ color: 'var(--text-muted)' }}>Create and manage your company departments</p>

      {error && (
        <div className="text-danger" style={{ margin: '15px 0', fontSize: '0.95rem' }}>
          {error}
        </div>
      )}

      {/* Add Department Inline Form */}
      <div className="glass-panel" style={{ padding: '25px', marginTop: '20px', marginBottom: '30px' }}>
        <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', color: 'var(--accent)' }}>Add New Department</h4>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <input 
              type="text" 
              className="modern-input" 
              placeholder="e.g. Engineering"
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Create Department
          </button>
        </form>
      </div>

      {/* Department List Table */}
      <div className="premium-table-container">
        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>Loading departments...</p>
        ) : (
          <table className="premium-table">
            <thead>
              <tr>
                <th style={{ width: '15%' }}>ID</th>
                <th style={{ width: '55%' }}>Department Name</th>
                <th style={{ width: '30%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(dept => (
                <tr key={dept.id}>
                  <td>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>#{dept.id}</span>
                  </td>
                  <td>
                    {editingId === dept.id ? (
                      <input 
                        type="text" 
                        className="modern-input"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        style={{ padding: '6px 12px', fontSize: '0.95rem', maxWidth: '300px' }}
                      />
                    ) : (
                      <span style={{ fontWeight: '500' }}>{dept.deptName}</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="actions-cell" style={{ justifyContent: 'flex-end' }}>
                      {editingId === dept.id ? (
                        <>
                          <button 
                            className="btn btn-success" 
                            style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                            onClick={() => handleUpdate(dept.id)}
                          >
                            Save
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                            onClick={() => handleEditClick(dept)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-danger" 
                            style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                            onClick={() => handleDelete(dept.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {departments.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-4" style={{ color: 'var(--text-muted)' }}>
                    No departments found. Add one above.
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

export default DepartmentList;
