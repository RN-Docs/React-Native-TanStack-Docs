import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from './clients';

export type LoginData = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export const login = async (data: LoginData) => {
  const response = await apiClient.post<LoginResponse>('/login', data);

  await AsyncStorage.setItem('token', response.data.token);

  return response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
};
