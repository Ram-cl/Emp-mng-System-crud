import api from './axiosConfig';

class DashboardService {
    getStats() {
        return api.get("/api/dashboard/stats");
    }
}

export default new DashboardService();
