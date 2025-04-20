'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/authStore";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleSkip = () => {
    router.push('/');
  };

  const handleVerify = () => {
    router.push('/verify-email/code');
  };

  return (
    <Card className="w-full border-none shadow-none bg-transparent animate-fadeIn">
      <CardHeader className="space-y-4">
        <div className="mx-auto bg-emerald-100 p-4 rounded-full">
          <Mail className="w-8 h-8 text-emerald-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-center text-gray-900">
          Подтвердите ваш email
        </CardTitle>
        <p className="text-gray-500 text-center">
          Отправить код подтверждения на адрес<br />
          <span className="font-medium text-gray-700">{user?.email}</span>
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleVerify}
          className="w-full h-12 text-white bg-emerald-500 hover:bg-emerald-600"
        >
          Подтвердить email
        </Button>
        <Button
          onClick={handleSkip}
          variant="ghost"
          className="w-full h-12 text-gray-500 hover:text-gray-700"
        >
          Пропустить
        </Button>
      </CardContent>
    </Card>
  );
} 