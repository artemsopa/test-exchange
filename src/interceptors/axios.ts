import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const SECRET = import.meta.env.VITE_EXCHANGE_SECRET;

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    Authorization: `Bearer ${SECRET}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
