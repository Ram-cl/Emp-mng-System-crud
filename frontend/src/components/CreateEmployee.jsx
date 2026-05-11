import { useState } from "react"
import { useNavigate } from "react-router-dom"
import EmployeeService from "../services/EmployeeService";

function CreateEmployee() 
{
    const navigate = useNavigate();

    const [employees,setEmployees]=useState({
        name:"",
        doj:"",
        dept:{
            deptName:"",
            designation:""
        }
    })

    const [errors,setErrors]=useState({
        name:"",
        doj:"",
        deptName:"",
        designation:""
    })

    const handleChange=(e)=>{
        e.preventDefault();
        const {name,value}=e.target;
        if(name==="name" || name==="doj")
        {
               setEmployees({...employees,[name]:value}); 
        }
        else
        {
            setEmployees({...employees,dept:{...employees.dept,[name]:value}});
        }

        setErrors({...errors,[name]:""});
    }

    const handleCancel=(e)=>{
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

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(validate())
        {
            const formattedDate = dateFormat(employees.doj);
            const employeeData=
            {
                ...employees,doj:formattedDate
            } 

            EmployeeService.addEmployee(employeeData).then(res=>{
                navigate("/");
            })
        }
    }

    const validate=()=>{
        const formErrors = {};
        let isValid=true;

        if(!employees.name) { formErrors.name="Name is mandatory"; isValid=false; }
        if(!employees.doj) { formErrors.doj="Date is mandatory"; isValid=false; }
        if(!employees.dept.deptName) { formErrors.deptName="Department name is mandatory"; isValid=false; }
        if(!employees.dept.designation) { formErrors.designation="Designation is mandatory"; isValid=false; }
        setErrors(formErrors);
        return isValid;
    }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
        <div className="glass-panel premium-card" style={{ width: '100%', maxWidth: '600px' }}>
            <h3 className="premium-card-title">Add New Employee</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="modern-label">Full Name</label>
                    <input type="text" id="name" name="name" className="modern-input"
                    value={employees.name}
                    onChange={handleChange}
                    placeholder="e.g. Jane Doe" />
                    {errors.name && <small className="text-danger"> {errors.name}</small>}
                </div>

                <div className="form-group">
                    <label className="modern-label">Date of Joining</label>
                    <input type="date" id="doj" name="doj" className="modern-input"
                    value={employees.doj}
                    onChange={handleChange}/>
                    {errors.doj && <small className="text-danger"> {errors.doj}</small>}
                </div>

                <div className="form-group">
                    <label className="modern-label">Department</label>
                    <input type="text" id="deptName" name="deptName" className="modern-input"
                    value={employees.dept.deptName}
                    onChange={handleChange}
                    placeholder="e.g. Engineering" />
                    {errors.deptName && <small className="text-danger"> {errors.deptName}</small>}
                </div>

                <div className="form-group">
                    <label className="modern-label">Designation</label>
                    <input type="text" id="designation" name="designation" className="modern-input"
                    value={employees.dept.designation}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer" />
                    {errors.designation && <small className="text-danger"> {errors.designation}</small>}
                </div>

                <div className="flex-between" style={{ marginTop: '40px' }}>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="btn btn-success">Save Employee</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateEmployee
