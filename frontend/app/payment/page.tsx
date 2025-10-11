"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { PaymentForm } from "@/components/forms/payment-form";

export default function PaymentPage() {
  return (
    <MainLayout>
      <PaymentForm />
    </MainLayout>
  );
}
