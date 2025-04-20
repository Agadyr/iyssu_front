import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "Email обязателен")
  .email("Неверный формат email")
  .max(100, "Email слишком длинный");

export const passwordSchema = z
  .string()
  .min(6, "Пароль должен содержать минимум 6 символов")
  .max(100, "Пароль слишком длинный")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру"
  );

export const phoneSchema = z
  .string()
  .min(1, "Телефон обязателен")
  .max(15, "Телефон слишком длинный")
  .regex(/^\+7\d{3}\d{3}\d{2}\d{2}$/, "Неверный формат телефона")

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const nameSchema = z
  .string()
  .min(2, "Имя должно содержать минимум 2 символа")
  .max(50, "Имя слишком длинное");

export const citySchema = z
  .string()
  .optional()

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  password_confirmation: passwordSchema,
  phone: phoneSchema,
  name: nameSchema,
}).refine((data) => data.password === data.password_confirmation, {
  message: "Пароли не совпадают",
  path: ["password_confirmation"],
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  password_confirmation: passwordSchema,
}).refine((data) => data.password === data.password_confirmation, {
  message: "Пароли не совпадают",
  path: ["password_confirmation"],
});

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export type AuthFormType = "signIn" | "signUp";

