import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser, User } from "../api/users";


type UpdateUser = {
    id: string;
    user: User;
}
export const useUpdateUsers = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, user }: UpdateUser) => updateUser(id, user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            throw new Error(error.message);
        },
    });
}