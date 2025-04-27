import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInFormValues } from "@/lib/validation/auth";
import { useAuthStore } from "@/store/auth/authStore";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { FormInput } from "@/components/ui/form-input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LoadingButton } from "@/components/ui/loading-button";
import { formTitles } from './AuthForm';

const SignInForm = () => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { setUser, setIsAuthenticated } = useAuthStore();
    const [isRememberMe, setIsRememberMe] = useState(false);
    
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting, isValid },
    } = useForm<SignInFormValues>({
      resolver: zodResolver(signInSchema),
      mode: "onChange",
    });
  
    const onSubmit = async (data: SignInFormValues) => {
      try {
        const endpoint = "api/auth/login";
        const formData = { email: data.email, password: data.password, remember: isRememberMe };
          
        const response = await api.post(endpoint, formData);
        
        if (response.data.user) {
          localStorage.setItem('auth_token', response.data.token);            
          
          setUser(response.data.user);
          setIsAuthenticated(true);
  
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
  
    const formConfig = formTitles.signIn;
  
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
              <Link
                href="/forgot-password"
                className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Забыли пароль?
              </Link>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <LoadingButton
              type="submit"
              isLoading={isSubmitting}
              loadingText="Вход..."
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

export default SignInForm