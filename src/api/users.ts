import { apiClient } from './clients';

 export type User = {
  id?: string;
  name: string;
  avatar: string;
  createdAt: string;
 }
export const getUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
}

export const createUser = async (user: User) => {
  const response = await apiClient.post('/users', user);
  return response.data;
}

export const deleteUser = async (id: string) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
}

export const updateUser = async (id: string, user: User) => {
  const response = await apiClient.put(`/users/${id}`, user);
  return response.data;
}

