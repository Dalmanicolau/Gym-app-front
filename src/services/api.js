import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gym-app-back-production-f698.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
