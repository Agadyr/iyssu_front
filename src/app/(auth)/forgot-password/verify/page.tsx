"use client";

import { usePasswordReset } from "@/hooks/usePasswordReset";
import { VerifyCode } from "@/components/VerifyCode";
import { useAuthStore } from "@/store/auth/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifyResetCodePage() {
  const { email } = useAuthStore();
  const router = useRouter();

  const {
    handleVerifyCode,
    handleSendResetLink,
    verifyError,
    isLoading
  } = usePasswordReset();

  useEffect(() => {
    if (!email) {
      router.push("/forgot-password");
    }
  }, [email, router]);

  if (!email) {
    return null;
  }
  return (
    <VerifyCode
      title="Подтверждение сброса пароля"
      subtitle="Введите код, отправленный на вашу почту"
      email={email}
      onVerify={handleVerifyCode}
      onSendCode={() => handleSendResetLink(email)}
      isSending={isLoading}
      verifyError={verifyError}
      redirectPath="/forgot-password/reset"
      showSkip={false}
    />
  );
} 