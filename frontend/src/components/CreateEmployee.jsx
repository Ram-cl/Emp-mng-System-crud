import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import DepartmentService from "../services/DepartmentService";

function CreateEmployee() {
    const navigate = useNavigate();
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

    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        DepartmentService.getAllDepartments()
            .then(res => {
                const depts = Array.isArray(res.data) ? res.data : (Array.isArray(res.data?.data) ? res.data.data : []);
                setDepartments(depts);
                if (depts.length > 0 && depts[0]?.id) {
                    setEmployee(prev => ({ ...prev, deptId: depts[0].id.toString() }));
                }
            })
            .catch(err => {
                console.error("Error loading departments", err);
                setDepartments([]);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

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

    const validate = () => {
        const formErrors = {};
        let isValid = true;

        if (!employee.name) { formErrors.name = "Name is mandatory"; isValid = false; }
        if (!employee.email) { formErrors.email = "Email is mandatory"; isValid = false; }
        if (!employee.phone) { formErrors.phone = "Phone number is mandatory"; isValid = false; }
        if (!employee.designation) { formErrors.designation = "Designation is mandatory"; isValid = false; }
        if (!employee.salary) { formErrors.salary = "Salary is mandatory"; isValid = false; }
        if (!employee.doj) { formErrors.doj = "Date of joining is mandatory"; isValid = false; }
        if (!employee.deptId) { formErrors.deptId = "Department selection is mandatory"; isValid = false; }
        
        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (validate()) {
            const formattedDate = dateFormat(employee.doj);
            const employeeData = {
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

            EmployeeService.addEmployee(employeeData)
                .then(res => {
                    navigate("/employees");
                })
                .catch(err => {
                    console.error("Error creating employee:", err);
                    setErrorMsg(err.response?.data?.message || "Failed to create employee. Email may already exist.");
                });
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
            <div className="glass-panel premium-card" style={{ width: '100%', maxWidth: '600px' }}>
                <h3 className="premium-card-title">Add New Employee</h3>
                
                {errorMsg && <div className="text-danger" style={{ textAlign: 'center', marginBottom: '15px', fontSize: '0.95rem' }}>{errorMsg}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="modern-label">Full Name</label>
                        <input type="text" name="name" className="modern-input"
                            value={employee.name}
                            onChange={handleChange}
                            placeholder="e.g. Jane Doe" 
                        />
                        {errors.name && <small className="text-danger"> {errors.name}</small>}
                    </div>

                    <div className="form-group">
                        <label className="modern-label">Email Address</label>
                        <input type="email" name="email" className="modern-input"
                            value={employee.email}
                            onChange={handleChange}
                            placeholder="e.g. jane@example.com" 
                        />
                        {errors.email && <small className="text-danger"> {errors.email}</small>}
                    </div>

                    <div className="form-group">
                        <label className="modern-label">Phone Number</label>
                        <input type="text" name="phone" className="modern-input"
                            value={employee.phone}
                            onChange={handleChange}
                            placeholder="e.g. +1234567890" 
                        />
                        {errors.phone && <small className="text-danger"> {errors.phone}</small>}
                    </div>

                    <div className="form-group">
                        <label className="modern-label">Department</label>
                        <select name="deptId" className="modern-input"
                            value={employee.deptId}
                            onChange={handleChange}
                            style={{ background: 'var(--input-bg)', color: 'var(--text-main)' }}
                        >
                            {departments.length === 0 ? (
                                <option value="">No departments available. Create one first.</option>
                            ) : (
                                departments.map(d => (
                                    <option key={d.id} value={d.id}>{d.deptName}</option>
                                ))
                            )}
                        </select>
                        {errors.deptId && <small className="text-danger"> {errors.deptId}</small>}
                    </div>

                    <div className="form-group">
                        <label className="modern-label">Designation</label>
                        <input type="text" name="designation" className="modern-input"
                            value={employee.designation}
                            onChange={handleChange}
                            placeholder="e.g. Senior Software Engineer" 
                        />
                        {errors.designation && <small className="text-danger"> {errors.designation}</small>}
                    </div>

                    <div className="form-group">
                        <label className="modern-label">Salary</label>
                        <input type="number" name="salary" className="modern-input"
                            value={employee.salary}
                            onChange={handleChange}
                            placeholder="e.g. 70000" 
                        />
                        {errors.salary && <small className="text-danger"> {errors.salary}</small>}
                    </div>

                    <div className="form-group">
                        <label className="modern-label">Date of Joining</label>
                        <input type="date" name="doj" className="modern-input"
                            value={employee.doj}
                            onChange={handleChange} 
                        />
                        {errors.doj && <small className="text-danger"> {errors.doj}</small>}
                    </div>

                    <div className="flex-between" style={{ marginTop: '40px' }}>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="btn btn-success" disabled={departments.length === 0}>Save Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateEmployee;
