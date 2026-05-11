import axios from 'axios';

const AUTH_API_BASE = "/api/auth";

class AuthService
{
    login(user)
    {
        return axios.post(`${AUTH_API_BASE}/login`, user);
    }

    register(user)
    {
        return axios.post(`${AUTH_API_BASE}/register`, user);
    }
}
export default new AuthService();