import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth/authStore";

interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  city?: string;
}

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileData) => {
      const response = await api.put('/api/profile/update', data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setUser(data.user);
    }
  });

  return {
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    updateError: updateProfileMutation.error
  };
};