"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import ApplicationsPage from "./applications/page";

export default function Home() {
  return (
    <ProtectedRoute>
      <ApplicationsPage />
    </ProtectedRoute>
  );
}