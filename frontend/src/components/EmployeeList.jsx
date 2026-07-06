import React, { useState, useEffect } from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Pagination & Sorting State
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const navigate = useNavigate();

  const [value] = useTypewriter({
    words: ["Details", "Information", "List"],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 120
  });

  useEffect(() => {
    loadEmployees();
  }, [page, size, sortBy, sortDir, searchQuery]);

  const loadEmployees = () => {
    setLoading(true);
    const apiCall = searchQuery.trim() !== ''
      ? EmployeeService.searchEmployees(searchQuery, page, size, sortBy, sortDir)
      : EmployeeService.getAllEmployees(page, size, sortBy, sortDir);

    apiCall
      .then(res => {
        setEmployees(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching employees:", err);
        setError("Failed to fetch employee list.");
        setLoading(false);
      });
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      EmployeeService.deleteEmployee(id)
        .then(() => {
          loadEmployees();
        })
        .catch(error => {
          console.error("Error deleting employee:", error);
          setError("Failed to delete employee.");
        });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(0); // Reset to first page when searching
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
    setPage(0); // Reset to first page when sorting
  };

  const renderSortIndicator = (column) => {
    if (sortBy !== column) return null;
    return sortDir === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className='mt-5'>
      <h3 className='animated-title'>Employee {value} <Cursor /> </h3>

      <div className="flex-between">
        <p style={{ color: 'var(--text-muted)' }}>Manage your organization's workforce</p>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleSearch}
            style={{
              padding: '8px 15px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              outline: 'none',
              width: '250px'
            }}
          />
          <Link to="/add-emp" className='btn btn-success'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            Add Employee
          </Link>
        </div>
      </div>

      {error && <div className="text-danger" style={{ marginTop: '15px' }}>{error}</div>}

      <div className='premium-table-container'>
        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>Loading employee list...</p>
        ) : (
          <>
            <table className='premium-table'>
              <thead>
                <tr>
                  <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort("id")}>
                    ID{renderSortIndicator("id")}
                  </th>
                  <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort("name")}>
                    Employee Details{renderSortIndicator("name")}
                  </th>
                  <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort("email")}>
                    Contact{renderSortIndicator("email")}
                  </th>
                  <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort("dept.deptName")}>
                    Department{renderSortIndicator("dept.deptName")}
                  </th>
                  <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort("designation")}>
                    Designation{renderSortIndicator("designation")}
                  </th>
                  <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort("salary")}>
                    Salary{renderSortIndicator("salary")}
                  </th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td>
                      <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>#{emp.id}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: '600' }}>{emp.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DOJ: {emp.doj}</div>
                    </td>
                    <td>
                      <div>{emp.email}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{emp.phone}</div>
                    </td>
                    <td>
                      <span className="glass-button" style={{ fontSize: '0.8rem', padding: '4px 8px', cursor: 'default' }}>
                        {emp.dept?.deptName ?? "N/A"}
                      </span>
                    </td>
                    <td style={{ fontWeight: '500' }}>{emp.designation}</td>
                    <td>${emp.salary?.toLocaleString()}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="actions-cell" style={{ justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                          onClick={() => navigate(`/update-emp/${emp.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                          onClick={() => deleteEmployee(emp.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {employees.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-4" style={{ color: 'var(--text-muted)' }}>
                      No employees found. Start by adding a new one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 0 && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 20px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(0,0,0,0.1)',
                flexWrap: 'wrap',
                gap: '15px'
              }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Showing {employees.length} of {totalElements} employees
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {/* Page Size Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Show:</span>
                    <select
                      value={size}
                      onChange={(e) => { setSize(parseInt(e.target.value)); setPage(0); }}
                      style={{
                        background: 'var(--input-bg)',
                        border: '1px solid var(--surface-border)',
                        color: 'var(--text-main)',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        outline: 'none',
                        fontSize: '0.85rem'
                      }}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                  </div>

                  {/* Previous Button */}
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                    onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                  >
                    Previous
                  </button>

                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '500' }}>
                    Page {page + 1} of {totalPages}
                  </span>

                  {/* Next Button */}
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
                    disabled={page === totalPages - 1}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
