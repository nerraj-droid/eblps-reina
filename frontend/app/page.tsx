"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { BusinessPermitList } from "@/components/business-permits/business-permit-list";
import { ProtectedRoute } from "@/components/auth/protected-route";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePageLoading } from "@/lib/hooks/use-page-loading";

export default function Home() {
  usePageLoading();

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <BusinessPermitList />
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}