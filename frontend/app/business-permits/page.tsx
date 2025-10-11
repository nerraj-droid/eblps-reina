"use client";

import { MainLayout } from "@/components/layout/main-layout";
import BusinessPermitList from "@/components/business-permits/business-permit-list";

export default function BusinessPermitsPage() {
  return (
    <MainLayout>
      <BusinessPermitList />
    </MainLayout>
  );
}
