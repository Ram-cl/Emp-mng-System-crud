import api from './axiosConfig';

class LeaveService {
    applyLeave(leaveRequest) {
        return api.post("/api/leaves/apply", leaveRequest);
    }
    getLeavesByEmployeeId(employeeId) {
        return api.get(`/api/leaves/employee/${employeeId}`);
    }
    getPendingLeaves() {
        return api.get("/api/leaves/pending");
    }
    getAllLeaves() {
        return api.get("/api/leaves");
    }
    approveLeave(id) {
        return api.put(`/api/leaves/${id}/approve`);
    }
    rejectLeave(id) {
        return api.put(`/api/leaves/${id}/reject`);
    }
}

export default new LeaveService();
