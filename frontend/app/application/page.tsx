"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { BusinessPermitForm } from "@/components/forms/business-permit-form";

export default function ApplicationPage() {
  return (
    <MainLayout>
      <BusinessPermitForm />
    </MainLayout>
  );
}
