import { useMutation } from '@tanstack/react-query';
import { login, type LoginData } from '../api/auth';
import { useAuthStore } from '../store/useAuthStore';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: async (data) => {
      await setAuth(data.token, data.user);
    },
  });
};
