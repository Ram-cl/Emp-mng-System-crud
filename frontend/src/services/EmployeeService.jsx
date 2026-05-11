import axios from 'axios';
const EMPLOYEE_API = "/api/v1/employees";

class EmployeeService
{
       addEmployee(employee)
       {
            return axios.post(EMPLOYEE_API,employee);
       } 
       getAllEmployees()
       {
            return axios.get(EMPLOYEE_API);
       }
       searchEmployees(name)
       {
           return axios.get(`${EMPLOYEE_API}/search?name=${name}`);
       }
       getEmployeeById(employeeId)
       {
          return axios.get(`${EMPLOYEE_API}/${employeeId}`);
       }
       updateEmployee(employeeId,employee)
       {
          if (!employeeId) {
            return Promise.reject(new Error('Missing employeeId for update'));
          }
          const url = `${EMPLOYEE_API}/${employeeId}`;
          console.debug('EmployeeService.updateEmployee URL:', url, 'body:', employee);
          return axios.put(url,employee);
       }
       deleteEmployee(employeeId)
       {
         if (!employeeId) {
           return Promise.reject(new Error('Missing employeeId for delete'));
         }
         const url = `${EMPLOYEE_API}/${employeeId}`;
         return axios.delete(url);
       }

}
export default new EmployeeService();