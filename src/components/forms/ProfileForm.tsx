"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormInput } from "@/components/ui/form-input";
import { Mail, User, Phone, MapPin, TrendingUp } from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";
import { useProfile } from "@/hooks/useProfile";
import { profileSchema } from "@/lib/validation/schemas";
import { useAuthStore } from "@/store/auth/authStore";  
import { BonusHistory } from "../modals/BonusHistory";
import { format } from "date-fns";
import EmailVerify from "../modals/EmailVerify";
import { ru } from "date-fns/locale";

type ProfileFormValues = z.infer<typeof profileSchema>;

export const ProfileForm = () => {
  const { updateProfile, isUpdating, updateError } = useProfile();
  const { user, isLoading } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange"
  });

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile(data);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-white border border-gray-100 shadow-sm">
          <CardHeader className="border-b bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Личные данные
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Управляйте вашей персональной информацией
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  defaultValue={user?.name || ""}
                  id="name"
                  label="Имя"
                  type="text"
                  icon={User}
                  placeholder="Ваше имя"
                  error={errors.name}
                  {...register("name")}
                />

                <FormInput
                  defaultValue={user?.phone || ""}
                  id="phone"
                  label="Телефон"
                  type="tel"
                  icon={Phone}
                  placeholder="+7 (999) 999-99-99"
                  error={errors.phone}
                  {...register("phone")}
                />
              </div>

              <div className="space-y-2">
                <FormInput
                  defaultValue={user?.email || ""}
                  id="email"
                  label="Email"
                  type="email"
                  icon={Mail}
                  placeholder="your.email@example.com"
                  error={errors.email}
                  {...register("email")}
                  disabled
                />
                
                {!user?.email_verified_at && (
                  <EmailVerify />
                )}
              </div>

              <FormInput
                defaultValue={user?.city || ""}
                id="city"
                label="Город"
                type="text"
                icon={MapPin}
                placeholder="Ваш город"
                error={errors.city}
                {...register("city")}
              />

              {updateError && (
                <p className="text-red-500 text-sm">
                  Произошла ошибка при обновлении профиля
                </p>
              )}

              <LoadingButton
                type="submit"
                isLoading={isUpdating}
                loadingText="Сохранение..."
                disabled={!isDirty}
                className="w-full"
              >
                Сохранить изменения
              </LoadingButton>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <BonusHistory
            bonusPoints={user?.bonus_points || 0}
            bonusHistories={user?.bonus_histories || []}
          />
          
          <Card className="w-full bg-white border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 p-6">
              <div className="p-3 bg-gray-50 rounded-full">
                <TrendingUp className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Участник с</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(user?.created_at || new Date()), "d MMMM yyyy", {locale: ru})}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
