import axios from 'axios';

const userData = JSON.parse(localStorage.getItem('userData'));
const { token } = userData ? userData : '';

const adminAxiosInstance = axios.create({
  baseURL: 'https://admin.lobbyist.games/api',
//    baseURL: 'http://localhost:4000/api',
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/json',
  },
});

adminAxiosInstance.interceptors.request.use(
    (config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

adminAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('userData');
            window.location.href = '/adminpanel/login';
        }
        return Promise.reject(error);
    }
);

export default adminAxiosInstance;
