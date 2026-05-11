import {useNavigate,useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import EmployeeService from '../services/EmployeeService';

function UpdateEmployee() 
{
  let navigate = useNavigate();
  const {id} = useParams();

  const [name,setName] = useState("");
  const [doj,setDoj] = useState("");
  const [department,setDepartment]= useState({deptName:"",designation:""});
  const [statusMessage,setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = (e)=>{
    e.preventDefault();
    navigate("/");
  }

  const dateFormat=(date)=>{
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2,"0");
    const month = String(d.getMonth()+1).padStart(2,"0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const parseBackendDateForInput=(dateString)=>{
    if (!dateString) return "";
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;

    const [day, month, year] = parts;
    return `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;
  }

  useEffect(()=>{
    setLoading(true);
    EmployeeService.getEmployeeById(id).then(res=>{
        setName(res.data.name || "");
        setDoj(parseBackendDateForInput(res.data.doj || ""));
        setDepartment({
          deptName: res.data?.dept?.deptName || "",
          designation: res.data?.dept?.designation || ""
        });
    }).catch(error => {
      console.error('Failed to load employee', error);
      setStatusMessage('Failed to load employee data.');
    }).finally(()=>{
      setLoading(false);
    });
  },[id])

  const handleUpdate=async(e)=>{
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    if (!name || !doj || !department.deptName || !department.designation) {
      setStatusMessage('All fields are required.');
      setLoading(false);
      return;
    }

    const formattedDate = dateFormat(doj);
    const updateEmployee={
      name,
      doj: formattedDate,
      dept:{
          deptName: department.deptName,
          designation: department.designation
      }
    }

    try {
      console.debug('UpdateEmployee submitting id:', id, 'payload:', updateEmployee);
      await EmployeeService.updateEmployee(id,updateEmployee);
      navigate("/");
    } catch (error) {
      console.error('Update failed', error);
      setStatusMessage(`Update failed: ${error?.message || 'Check backend'}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
        <div className="glass-panel premium-card" style={{ width: '100%', maxWidth: '600px' }}>
            <h3 className="premium-card-title">Update Employee Details</h3>
            
            <form onSubmit={handleUpdate}> 
                <div className="form-group">
                    <label className="modern-label">Full Name</label>
                    <input type="text" name="name" id="name" className="modern-input"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label className="modern-label">Date of Joining</label>
                    <input type="date" name="doj" id="doj" className="modern-input"
                    value={doj}
                    onChange={(e)=> setDoj(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label className="modern-label">Department</label>
                    <input type="text" name="deptName" id="deptName" className="modern-input"
                    value={department.deptName}
                    onChange={(e)=> setDepartment({...department,deptName:e.target.value})}/>
                </div>

                <div className="form-group">
                    <label className="modern-label">Designation</label>
                    <input type="text" name="designation" id="designation" className="modern-input"
                    value={department.designation}
                    onChange={(e)=> setDepartment({...department,designation:e.target.value})}/>
                </div>

                {statusMessage && <div className="text-danger" style={{marginTop: '15px'}}>{statusMessage}</div>}

                <div className="flex-between" style={{ marginTop: '40px' }}>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? 'Saving...' : 'Update Employee'}
                    </button>
                </div>
            </form> 
        </div>
    </div>
  )
}

export default UpdateEmployee