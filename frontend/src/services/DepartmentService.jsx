import api from './axiosConfig';

class DepartmentService {
    getAllDepartments() {
        return api.get("/api/departments");
    }
    getDepartmentById(id) {
        return api.get(`/api/departments/${id}`);
    }
    createDepartment(department) {
        return api.post("/api/departments", department);
    }
    updateDepartment(id, department) {
        return api.put(`/api/departments/${id}`, department);
    }
    deleteDepartment(id) {
        return api.delete(`/api/departments/${id}`);
    }
}

export default new DepartmentService();
