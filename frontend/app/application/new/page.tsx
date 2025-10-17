"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { ClientApplicationForm } from "@/components/forms/client-application-form";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function NewApplicationPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <ClientApplicationForm />
      </MainLayout>
    </ProtectedRoute>
  );
}
