import axios from 'axios';

// Set the base URL for the backend API
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust based on your backend URL
});

export default api;
