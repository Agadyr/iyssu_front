"use client";
import { AuthFormType } from "@/lib/validation/auth";
import SignInForm from "./SignInForm";  
import SignUpForm from "./SignUpForm";

interface AuthFormProps {
  type: AuthFormType;
}

export const formTitles = {
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
  return type === "signIn" ? <SignInForm /> : <SignUpForm />;
};

export default AuthForm;
