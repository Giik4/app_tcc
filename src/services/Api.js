import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8000', // Replace with your API base URL
});

export default api;
