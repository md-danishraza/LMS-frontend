'use client'
import Loader from '@/components/Loader';
import WizardStepper from '@/components/WizardStepper';
import { useUser } from '@clerk/nextjs';
import React from 'react'
import CompletionPage from './completion/page';
import PaymentPage from './payment/page';
import CheckoutDetailsPage from './details/page';
import { useCheckoutNavigation } from '@/hooks/useCheckoutNavigation';

// parent checkout page 
function CheckoutWizard() {
  const { isLoaded } = useUser();
  // get current step
  const { checkoutStep } = useCheckoutNavigation();

  if (!isLoaded) return <Loader/>;

  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutDetailsPage />;
      case 2:
        return <PaymentPage />;
      case 3:
        return <CompletionPage />;
      default:
        return <CheckoutDetailsPage />;
    }
  };

  return (
    <div className="w-full px-4 h-full flex flex-col items-center py-12">
      {/*render current step with page comp*/}
      <WizardStepper currentStep={checkoutStep} />
      <div className="w-full max-w-screen-lg flex flex-col items-center mt-10">{renderStep()}</div>
    </div>
  );
}

export default CheckoutWizard
