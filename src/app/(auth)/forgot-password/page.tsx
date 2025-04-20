'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormInput } from "@/components/ui/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePasswordReset } from "@/hooks/usePasswordReset";
import { Mail } from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";
import { emailSchema } from "@/lib/validation/auth";

const schema = z.object({
  email: emailSchema,
});

export default function ForgotPasswordPage() {
  const { handleSendResetLink, isLoading } = usePasswordReset();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    handleSendResetLink(data.email);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none bg-transparent">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold text-gray-900">
          Восстановление пароля
        </CardTitle>
        <p className="text-gray-600">
          Введите email для восстановления пароля
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            id="email"
            label="Email"
            placeholder="example@gmail.com"
            type="email"
            icon={Mail}
            error={errors.email}
            {...register("email")}
          />

          <LoadingButton
            type="submit"
            isLoading={isLoading}
            loadingText="Отправка..."
            disabled={!isValid}
          >
            Отправить
          </LoadingButton>
        </form>
      </CardContent>
    </Card>
  );
} 