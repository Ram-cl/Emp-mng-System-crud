import React from 'react'
import {useTypewriter,Cursor} from 'react-simple-typewriter';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function EmployeeList() 
{
  const [employees,setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const [value] = useTypewriter({
    words : ["Details","Information","List"],
    loop: true,
    typeSpeed : 80,
    deleteSpeed : 120
  })

  useEffect(()=>{
    EmployeeService.getAllEmployees().then(res =>{
        setEmployees(res.data);
    })
  },[]);

  const deleteEmployee =(id)=>{
        EmployeeService.deleteEmployee(id).then(res=>{
            EmployeeService.getAllEmployees().then(res=>{
                setEmployees(res.data);
            })
            .catch(error=>{
                console.log(error);
            })
        })
    } 

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() !== '') {
      EmployeeService.searchEmployees(query).then(res => {
        setEmployees(res.data);
      }).catch(err => console.log(err));
    } else {
      EmployeeService.getAllEmployees().then(res => {
        setEmployees(res.data);
      });
    }
  };

  return (
    <div className='mt-5'>
        <h3 className='animated-title'>Employee {value} <Cursor/> </h3> 
        
        <div className="flex-between">
            <p style={{color: 'var(--text-muted)'}}>Manage your organization's workforce</p>
            <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
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
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    Add Employee
                </Link>    
            </div>
        </div>

        <div className='premium-table-container'>
            <table className='premium-table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>DOJ</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(emp =>{
                           return  <tr key={emp.id}>
                                        <td><span style={{color: 'var(--primary)', fontWeight: 'bold'}}>#{emp.id}</span></td>
                                        <td style={{fontWeight: '500'}}>{emp.name}</td>
                                        <td>{emp.doj}</td>
                                        <td><span className="glass-button" style={{fontSize: '0.8rem', padding: '4px 8px'}}>{emp.dept.deptName}</span></td>
                                        <td>{emp.dept.designation}</td>
                                        <td>
                                            <div className="actions-cell">
                                                <button type="button" className='btn btn-secondary' style={{padding: '6px 12px', fontSize: '0.85rem'}} onClick={()=> navigate(`/update-emp/${emp.id}`)}>Edit</button>
                                                <button className='btn btn-danger' style={{padding: '6px 12px', fontSize: '0.85rem'}} onClick={()=> deleteEmployee(emp.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                        })   
                    }
                    {employees.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-4" style={{color: 'var(--text-muted)'}}>
                                No employees found. Start by adding a new one.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default EmployeeList

