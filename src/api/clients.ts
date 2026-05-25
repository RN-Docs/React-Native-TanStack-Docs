import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// src/api/clients.ts
export const apiClient = axios.create({
  baseURL: 'https://6a1228e278d0434e0d5d1cbf.mockapi.io/test/',
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});