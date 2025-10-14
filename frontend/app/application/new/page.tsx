"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { BusinessPermitForm } from "@/components/forms/business-permit-form";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePageLoading } from "@/lib/hooks/use-page-loading";

export default function NewApplicationPage() {
    const router = useRouter();
    usePageLoading();

    const handleFormSubmit = (formData: any) => {
        console.log("New application submitted:", formData);
        // Handle form submission logic here
        // After successful submission, redirect back to applications list
        router.push("/applications");
    };

    const handleFormCancel = () => {
        router.push("/applications");
    };

    return (
        <MainLayout>
            <div className="space-y-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>New Application</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <BusinessPermitForm
                    title="New Business Permit Application"
                    subtitle="Fill out the form below to submit a new business permit application"
                    showBackButton={true}
                    onBack={() => router.push("/")}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    submitButtonText="Submit Application"
                    cancelButtonText="Cancel"
                    showApplicationType={true}
                    showTypeAndPayment={true}
                    isReadOnly={false}
                />
            </div>
        </MainLayout>
    );
}
