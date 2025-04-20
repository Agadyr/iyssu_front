"use client";

import { useAuthStore } from "@/store/auth/authStore";
import { useEmailVerification } from "@/hooks/useEmailVerification";
import { VerifyCode } from "@/components/VerifyCode";

export default function VerifyEmailPage() {
  const { user } = useAuthStore();
  const {
    handleVerify,
    handleSendOtp,
    isSending,
    verifyError
  } = useEmailVerification();

  return (
    <VerifyCode
      title="Введите код подтверждения"
      subtitle="На вашу почту отправится код подтверждения"
      email={user?.email}
      onVerify={handleVerify}
      onSendCode={handleSendOtp}
      isSending={isSending}
      verifyError={verifyError}
      redirectPath="/"
      showSkip={true}
    />
  );
}
