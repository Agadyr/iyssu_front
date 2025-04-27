"use client";

import { ProfileForm } from "@/components/forms/ProfileForm";
import Header from "@/components/layout/header";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div>
        <Header />
        <ProfileForm />
      </div>
    </ProtectedRoute>
  );
}
