import { LoadingButton } from "../ui/loading-button";
import { useAuthStore } from "@/store/auth/authStore";
import { useEmailVerification } from "@/hooks/useEmailVerification";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { VerifyCode } from "../VerifyCode";
import { useState, useEffect } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

const EmailVerify = () => {
  const { user } = useAuthStore();
  const { handleSendOtp, isSending, handleVerify, verifyError } = useEmailVerification();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (user?.email_verified_at) {
      setIsOpen(false);
    }
  }, [user]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTitle>Подтверждение email</DialogTitle>
      <DialogTrigger asChild>
        <div className="p-3 bg-amber-50 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors">
          <div className="flex items-center justify-between">
            <p className="text-sm text-amber-600">Email не подтвержден</p>
            <LoadingButton
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
              isLoading={isSending}
              loadingText="Отправка..."
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
            >
              Подтвердить email
            </LoadingButton>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 bg-white">
        <div className="p-6">
          <VerifyCode
            title="Подтверждение email"
            subtitle="Введите код, отправленный на вашу почту"
            email={user?.email}
            onVerify={(code) => {
              handleVerify(code);
            }}
            onSendCode={handleSendOtp}
            isSending={isSending}
            verifyError={verifyError}
            redirectPath="/"
            showSkip={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerify; 