import axios from 'axios';

// Use your Render backend URL
const AUTH_API_BASE = "https://emp-mng-system-crud.onrender.com/api/auth";

class AuthService {
    login(user) {
        return axios.post(`${AUTH_API_BASE}/login`, user);
    }

    register(user) {
        return axios.post(`${AUTH_API_BASE}/register`, user);
    }
}

export default new AuthService();
