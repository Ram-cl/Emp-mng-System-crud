import api from './axiosConfig';

class EmployeeService {
    addEmployee(employee) {
        return api.post("/api/v1/employees", employee);
    } 
    getAllEmployees(page = 0, size = 5, sortBy = "id", sortDir = "asc") {
        return api.get(`/api/v1/employees?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`);
    }
    searchEmployees(name, page = 0, size = 5, sortBy = "id", sortDir = "asc") {
        return api.get(`/api/v1/employees/search?name=${name}&page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`);
    }
    getEmployeeById(employeeId) {
        return api.get(`/api/v1/employees/${employeeId}`);
    }
    updateEmployee(employeeId, employee) {
        if (!employeeId) {
            return Promise.reject(new Error('Missing employeeId for update'));
        }
        return api.put(`/api/v1/employees/${employeeId}`, employee);
    }
    deleteEmployee(employeeId) {
        if (!employeeId) {
            return Promise.reject(new Error('Missing employeeId for delete'));
        }
        return api.delete(`/api/v1/employees/${employeeId}`);
    }
}

export default new EmployeeService();
