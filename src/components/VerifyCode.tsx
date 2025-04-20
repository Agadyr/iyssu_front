"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { OTPInput } from "./otp-input";

interface VerifyCodeProps {
  title: string;
  subtitle: string;
  email?: string;
  onVerify: (code: string) => void;
  onSendCode: () => void;
  isSending?: boolean;
  verifyError?: Error | null;
  redirectPath?: string;
  showSkip?: boolean;
}

export function VerifyCode({
  title,
  subtitle,
  email,
  onVerify,
  onSendCode,
  isSending,
  verifyError,
  redirectPath = '/',
  showSkip = false
}: VerifyCodeProps) {
  const router = useRouter();
  const [time, setTime] = useState(0);
  const [message, setMessage] = useState("");

  const handleSendCode = useCallback(async () => {
    try {
      await onSendCode();
      setTime(120);
      setMessage("OTP отправлен на вашу почту");
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  }, [onSendCode]);

  useEffect(() => {
    if (time <= 0) return;
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        if (prev <= 117) {
          setMessage("");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none bg-transparent">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold text-center text-gray-900">
          {title}
        </CardTitle>
        <p className="text-gray-600 text-center font-medium">
          {subtitle}
        </p>
        {email && (
          <p className="text-gray-600 text-center font-medium">
            {email}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <OTPInput onComplete={onVerify}/>

        <div className="space-y-3 text-center">
          {verifyError && (
            <p className="text-red-500 text-sm">Неверный код подтверждения</p>
          )}

          {message && <p className="text-emerald-600 text-sm">{message}</p>}

          {time > 0 ? (
            <p className="text-gray-500 font-medium">{formatTime(time)}</p>
          ) : (
            <Button
              variant="ghost"
              onClick={handleSendCode}
              disabled={isSending}
              className="w-full"
            >
              {isSending ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Отправка...
                </>
              ) : (
                "Отправить код"
              )}
            </Button>
          )}

          {showSkip && (
            <Button
              onClick={() => router.push(redirectPath)}
              variant="ghost"
              className="text-gray-400 hover:text-gray-600"
            >
              Пропустить верификацию
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 