import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://51.250.123.71:3000/api',
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default instance;
