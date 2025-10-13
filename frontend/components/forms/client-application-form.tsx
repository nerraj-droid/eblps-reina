"use client";

import { BusinessPermitForm } from "./business-permit-form";

export function ClientApplicationForm() {
  const handleSubmit = (formData: any) => {
    console.log("Client application submitted:", formData);
  };

  const handleCancel = () => {
    console.log("Client application cancelled");
  };

  const handleBack = () => {
    console.log("Back button clicked");
  };

  return (
    <BusinessPermitForm
      title="Business Permit Application"
      subtitle="Apply for a new business permit"
      showBackButton={true}
      onBack={handleBack}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      submitButtonText="Submit Application"
      cancelButtonText="Cancel"
      showApplicationType={false}
      showBusinessFees={false}
      isReadOnly={false}
    />
  );
}
