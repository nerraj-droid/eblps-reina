"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { ClientApplicationForm } from "@/components/forms/client-application-form";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { usePageLoading } from "@/lib/hooks/use-page-loading";

export default function NewApplicationPage() {
  usePageLoading();
  
  return (
    <ProtectedRoute>
      <MainLayout>
        <ClientApplicationForm />
      </MainLayout>
    </ProtectedRoute>
  );
}
