"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormType, signInSchema, SignUpFormValues, signUpSchema } from "@/lib/validation/auth";
import { useAuthStore } from "@/store/auth/authStore";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, User, Phone } from "lucide-react";
import Link from "next/link";
import { FormInput } from "@/components/ui/form-input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LoadingButton } from "@/components/ui/loading-button";

interface AuthFormProps {
  type: AuthFormType;
}

const formTitles = {
  signIn: {
    title: "Вход в аккаунт",
    description: "Войдите в свой аккаунт, чтобы получить доступ к коллекции ароматов",
    buttonText: "Войти",
    altText: "Нет аккаунта?",
    altLink: "/sign-up",
    altLinkText: "Зарегистрироваться",
  },
  signUp: {
    title: "Регистрация",
    description: "Создайте аккаунт, чтобы получить доступ к коллекции ароматов",
    buttonText: "Зарегистрироваться",
    altText: "Уже есть аккаунт?",
    altLink: "/sign-in",
    altLinkText: "Войти",
  },
} as const;

const AuthForm = ({ type }: AuthFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuthStore();
  const [isRememberMe, setIsRememberMe] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(type === "signIn" ? signInSchema : signUpSchema),
    mode: "onChange",
    defaultValues: type === "signIn" 
      ? undefined
      : {
          email: "",
          password: "",
          name: "",
          password_confirmation: "",
          phone: undefined,
        }
  });
  const phone = useWatch({ control, name: "phone" });
  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const endpoint = type === "signIn" ? "api/auth/login" : "api/auth/register";
      const formData = type === "signIn" 
        ? { email: data.email, password: data.password, remember: isRememberMe }
        : { ...data, remember: isRememberMe };
        
      const response = await api.post(endpoint, formData);
      
      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);

        const expires = new Date();
        expires.setDate(expires.getDate() + 30);

        document.cookie = `auth_token=${response.data.token}; path=/; expires=${expires.toUTCString()}; SameSite=None; Secure`;


        if (!response.data.user.email_verified_at) {
          router.push('/verify-email');
        } else {
          router.push('/');
        }
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      }
    }
  };

  const formConfig = formTitles[type];

  return (  
    <Card className="w-full border-none shadow-none bg-transparent animate-fadeIn">
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {formConfig.title}
        </CardTitle>
        <p className="text-gray-500">
          {formConfig.description}
        </p>
      </CardHeader>
      <CardContent>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6" 
          autoComplete="off"
        >
          {type === "signUp" && (
            <FormInput
              id="name"
              label="Имя"
              type="text"
              icon={User}
              placeholder="Ваше имя"
              error={errors.name}
              {...register("name")}
            />
          )}

          <FormInput
            id="email"
            label="Email"
            type="email"
            icon={Mail}
            placeholder="your.email@example.com"
            error={errors.email}
            autoComplete="off"
            {...register("email")}
          />

          <FormInput
            id="password"
            label="Пароль"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            error={errors.password}
            autoComplete="new-password"
            {...register("password")}
          />

          {type === "signUp" && (
            <FormInput
              id="confirmPassword"
              label="Подтвердите пароль"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              error={errors.password_confirmation}
              autoComplete="new-password"
              {...register("password_confirmation")}
            />
          )}

          {type === "signUp" && (
            <FormInput
              id="phone"
              label="Телефон"
              type="tel"
              icon={Phone}
              placeholder="+7 (999) 999-99-99"
              error={errors.phone}
              {...register("phone")}
              onFocus={() => !phone ? setValue("phone", "+7") : null}
            />
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isRememberMe}
                onChange={(e) => setIsRememberMe(e.target.checked)}
              />
              <span className="text-sm text-gray-600">Запомнить меня</span>
            </label>
            {type === "signIn" && (
              <Link
                href="/forgot-password"
                className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Забыли пароль?
              </Link>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <LoadingButton
            type="submit"
            isLoading={isSubmitting}
            loadingText={type === "signIn" ? "Вход..." : "Регистрация..."}
            disabled={!isValid}
          >
            {formConfig.buttonText}
          </LoadingButton>

          <p className="text-center text-sm text-gray-500">
            {formConfig.altText}{" "}
            <Link
              href={formConfig.altLink}
              className="text-emerald-600 hover:text-emerald-500 font-medium transition-colors"
            >
              {formConfig.altLinkText}
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
