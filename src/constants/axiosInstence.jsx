import axios from 'axios';
import { baseURL } from './BaseConfig';
import { logout } from '../redux/authSlice/authSlice';
// import { parseJwt } from '../utils/reuseFunctions';

const api = axios.create({
    baseURL: baseURL,
});

let store;
export const injectStore = _store => {
    store = _store;
};

api.interceptors.request.use(
    (config) => {
        let token = store.getState().auth.accessToken;
        const parsedToked = token ? JSON.parse(atob(token.split('.')[1])) : null;

        if (!token) {
            store.dispatch(logout());
        } else {
            config.headers['Authorization'] = `Bearer ${token}`;
            try {
                if (token && parsedToked && parsedToked.exp) {
                    const currentTime = Math.floor(Date.now() / 1000);
                    if (parsedToked.exp < currentTime) {
                        store.dispatch(logout());
                    } else {
                        return config;
                    }
                } else {
                    return config;
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                return config;
            }
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
