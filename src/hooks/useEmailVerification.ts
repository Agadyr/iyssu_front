import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth/authStore';

interface VerifyEmailPayload {
  code: string;
  email: string | undefined;
}

interface SendOtpPayload {
  email: string | undefined;
}

export const useEmailVerification = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const queryClient = useQueryClient();

  const verifyEmail = useMutation({
    mutationFn: async (payload: VerifyEmailPayload) => {
      const response = await api.post('/api/auth/verify-email', payload);
      if (user) {
        setUser({ ...user, email_verified_at: response.data.user.email_verified_at as string });
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push('/profile');
    },
  });

  const sendOtp = useMutation({
    mutationFn: async (payload: SendOtpPayload) => {
      const response = await api.post('/api/auth/send-confirmation-otp', payload);
      return response.data;
    },
  });

  const handleVerify = (code: string) => {
    return verifyEmail.mutate({ code, email: user?.email });
  };

  const handleSendOtp = () => {
    return sendOtp.mutate({ email: user?.email });
  };

  return {
    handleVerify,
    handleSendOtp,
    isSending: sendOtp.isPending || verifyEmail.isPending,
    verifyError: verifyEmail.error,
    sendError: sendOtp.error,
    sendSuccess: sendOtp.isSuccess,
    sendData: sendOtp.data,
  };
}; 