"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { AdminForm } from "@/components/forms/admin-form";
import { usePageLoading } from "@/lib/hooks/use-page-loading";

export default function AdminPage() {
  usePageLoading();
  
  return (
    <MainLayout>
      <AdminForm />
    </MainLayout>
  );
}
