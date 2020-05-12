import axios from 'axios';
import authHeader from './auth-header';
import baseUrl from '../baseurl';

const host = baseUrl()

const API_URL = `${host}/api/test/`;

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', {headers: authHeader()});
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', {headers: authHeader()})
            .catch(() => {
                return axios.get(API_URL + 'admin', {headers: authHeader()});
            });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', {headers: authHeader()});
    }
}

export default new UserService();
