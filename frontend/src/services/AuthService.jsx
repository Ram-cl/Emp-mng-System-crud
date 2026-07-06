import api from './axiosConfig';

class AuthService {
    login(user) {
        return api.post(`/api/auth/login`, user);
    }

    register(user) {
        return api.post(`/api/auth/register`, user);
    }
}

export default new AuthService();
