import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import DepartmentService from '../services/DepartmentService';

function UpdateEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [departments, setDepartments] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    salary: "",
    doj: "",
    deptId: ""
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/employees");
  };

  const dateFormat = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const parseBackendDateForInput = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;

    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  useEffect(() => {
    setLoading(true);
    // Load departments
    DepartmentService.getAllDepartments()
      .then(deptRes => {
        setDepartments(deptRes.data);
        
        // Load employee
        return EmployeeService.getEmployeeById(id);
      })
      .then(empRes => {
        const empData = empRes.data || {};
        setEmployee({
          name: empData.name || "",
          email: empData.email || "",
          phone: empData.phone || "",
          designation: empData.designation || "",
          salary: empData.salary || "",
          doj: parseBackendDateForInput(empData.doj || ""),
          deptId: empData.dept?.id ? String(empData.dept.id) : ""
        });
      })
      .catch(error => {
        console.error('Failed to load details', error);
        setStatusMessage('Failed to load employee data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    if (!employee.name || !employee.email || !employee.phone || !employee.designation || !employee.salary || !employee.doj || !employee.deptId) {
      setStatusMessage('All fields are required.');
      setLoading(false);
      return;
    }

    const formattedDate = dateFormat(employee.doj);
    const updatePayload = {
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      designation: employee.designation,
      salary: parseFloat(employee.salary),
      doj: formattedDate,
      dept: {
        id: parseInt(employee.deptId)
      }
    };

    try {
      await EmployeeService.updateEmployee(id, updatePayload);
      navigate("/employees");
    } catch (error) {
      console.error('Update failed', error);
      setStatusMessage(error.response?.data?.message || `Update failed: ${error?.message || 'Check backend'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="glass-panel premium-card" style={{ width: '100%', maxWidth: '600px' }}>
        <h3 className="premium-card-title">Update Employee Details</h3>

        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label className="modern-label">Full Name</label>
            <input type="text" name="name" className="modern-input"
              value={employee.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="modern-label">Email Address</label>
            <input type="email" name="email" className="modern-input"
              value={employee.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="modern-label">Phone Number</label>
            <input type="text" name="phone" className="modern-input"
              value={employee.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="modern-label">Department</label>
            <select name="deptId" className="modern-input"
              value={employee.deptId}
              onChange={handleChange}
              style={{ background: 'var(--input-bg)', color: 'var(--text-main)' }}
            >
              {departments.length === 0 ? (
                <option value="">No departments available.</option>
              ) : (
                departments.map(d => (
                  <option key={d.id} value={d.id}>{d.deptName}</option>
                ))
              )}
            </select>
          </div>

          <div className="form-group">
            <label className="modern-label">Designation</label>
            <input type="text" name="designation" className="modern-input"
              value={employee.designation}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="modern-label">Salary</label>
            <input type="number" name="salary" className="modern-input"
              value={employee.salary}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="modern-label">Date of Joining</label>
            <input type="date" name="doj" className="modern-input"
              value={employee.doj}
              onChange={handleChange}
            />
          </div>

          {statusMessage && <div className="text-danger" style={{ marginTop: '15px' }}>{statusMessage}</div>}

          <div className="flex-between" style={{ marginTop: '40px' }}>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn btn-success" disabled={loading || departments.length === 0}>
              {loading ? 'Saving...' : 'Update Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployee;