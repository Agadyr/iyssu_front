'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormInput } from "@/components/ui/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePasswordReset } from "@/hooks/usePasswordReset";
import { Lock } from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { resetPasswordSchema, ResetPasswordFormValues } from "@/lib/validation/auth";


export default function ResetPasswordPage() {
  const { handleResetPassword, isLoading, email } = usePasswordReset();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange"
  });
  const onSubmit = (data: ResetPasswordFormValues) => {
    handleResetPassword(data.password);
  };

  useEffect(() => {
    if (!email) {
      router.push("/sign-in");
    }
  }, [email, router]);
  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none bg-transparent">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold text-center text-gray-900">
          Создание нового пароля
        </CardTitle>
        <p className="text-gray-600 text-center">
          Введите новый пароль
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            id="password"
            label="Новый пароль"
            autoComplete="new-password"
            placeholder="********"
            type="password"
            icon={Lock}
            error={errors.password}
            {...register("password")}
          />

          <FormInput
            id="password_confirmation"
            label="Подтвердите пароль"
            autoComplete="new-password"
            placeholder="********"
            type="password"
            icon={Lock}
            error={errors.password_confirmation}
            {...register("password_confirmation")}
          />

          <LoadingButton
            isLoading={isLoading}
            loadingText="Сохранение..."
            disabled={!isValid}
          >
            Сохранить новый пароль
          </LoadingButton>
        </form>
      </CardContent>
    </Card>
  );
} 