import axios from 'axios';

const client = axios.create({
  // Use 127.0.0.1 instead of localhost to avoid IPv6 resolution issues
  baseURL: 'http://127.0.0.1:8000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;