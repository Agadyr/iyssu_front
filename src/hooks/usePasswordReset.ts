import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useRouter } from 'next/navigation';
import { useAuthStore } from "@/store/auth/authStore";

interface ForgotPasswordData {
  email: string;
}

interface VerifyCodePayload {
  code: string;
  email: string;
}

interface ResetPasswordData {
  email: string;
  token: string;
  password: string;
}

export const usePasswordReset = () => {
  const router = useRouter();
  const { email, setEmail } = useAuthStore();

  const sendResetLinkMutation = useMutation({
    mutationFn: async (payload: ForgotPasswordData) => {
      const response = await api.post("/api/auth/forgot-password/send-otp", payload);
      return response.data;
    },
    onSuccess: (_, variables) => {
      router.push('/forgot-password/verify');
      setEmail(variables.email);
    }
  });

  const verifyCodeMutation = useMutation({
    mutationFn: async (payload: VerifyCodePayload) => {
      const response = await api.post("/api/auth/forgot-password/verify-otp", payload);
      return response.data;
    },
    onSuccess: (data) => {
      router.push('/forgot-password/reset');
      localStorage.setItem('reset_token', data.token);
    }
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: Omit<ResetPasswordData, 'email'>) => {
      const response = await api.post("/api/auth/forgot-password/reset", {
        ...data,
        email: email
      });
      return response.data;
    },
    onSuccess: () => {
      localStorage.removeItem('reset_token');
      setEmail('');
      router.push('/sign-in');
    }
  });

  const handleSendResetLink = (email: string) => {
    return sendResetLinkMutation.mutate({ email });
  };

  const handleVerifyCode = (code: string) => {
    if (!email) return;
    return verifyCodeMutation.mutate({ code, email });
  };

  const handleResetPassword = (password: string) => {
    const token = localStorage.getItem('reset_token');
    if (!email || !token) return;
    
    return resetPasswordMutation.mutate({ 
      password,
      token
    });
  };

  return {
    handleSendResetLink,
    handleVerifyCode,
    handleResetPassword,
    verifyError: verifyCodeMutation.error,
    email,
    isLoading: sendResetLinkMutation.isPending || 
               verifyCodeMutation.isPending || 
               resetPasswordMutation.isPending
  };
}; 