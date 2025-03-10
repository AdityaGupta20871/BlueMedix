import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api; 