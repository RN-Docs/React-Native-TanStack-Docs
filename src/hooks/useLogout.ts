import { useQueryClient } from '@tanstack/react-query';
import { logout as logoutRequest } from '../api/auth';
import { useAuthStore } from '../store/useAuthStore';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.logout);

  const logout = async () => {
    await logoutRequest();
    await clearAuth();
    queryClient.clear();
  };

  return { logout };
};
