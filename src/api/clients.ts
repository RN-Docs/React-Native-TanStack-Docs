import axios from 'axios';

// src/api/clients.ts
export const apiClient = axios.create({
  baseURL: 'https://6a1228e278d0434e0d5d1cbf.mockapi.io/test/',
});