'use client';

import React, { useEffect, useState } from 'react';
import { useCheckoutNavigation } from '@/hooks/useCheckoutNavigation';
import { useCurrentCourse } from '@/hooks/useCurrentCourse';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import CoursePreview from '@/components/CoursePreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldCheck } from 'lucide-react';
import { load } from '@cashfreepayments/cashfree-js';
import { useCreateOrderMutation } from '@/state/apis/paymentApi';

const CASHFREE_APP_ID = process.env.NEXT_PUBLIC_CASHFREE_APP_ID;

type CashfreeSDK = {
  checkout(options: {
    paymentSessionId: string;
    returnUrl: string;
  }): Promise<any>;
};

function PaymentPage() {
  const { navigateToStep } = useCheckoutNavigation();
  const { course: selectedCourse, courseId } = useCurrentCourse();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cashfree, setCashfree] = useState<CashfreeSDK | null>(null);

  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();

  useEffect(() => {
    if (!CASHFREE_APP_ID) {
      setError('Payment system is not configured. Please contact support.');
      console.error('NEXT_PUBLIC_CASHFREE_APP_ID is not set.');
      return;
    }

    async function initializeCashfree() {
      try {
        const cf = await load({
          mode: 'sandbox',
        });

        if (!cf) {
          throw new Error('Failed to initialize Cashfree SDK');
        }

        setCashfree(cf);
      } catch (e) {
        console.error('Cashfree SDK failed to initialize:', e);
        setError('Failed to load payment gateway. Please refresh.');
      }
    }
    initializeCashfree();
  }, []);

  const handlePayment = async () => {
    if (!courseId || !user || !cashfree) return;
    setIsLoading(true);
    setError(null);

    try {
      // --- FIX 1: Destructure 'order', not 'data' ---
      // Your backend returns { order: ... }, so we get 'order'
      const order:any = await createOrder({
        courseId: courseId,
        userId: user.id,
      }).unwrap();

      console.log('Order details received:', order); // This will now log the object

      if (!order || !order.payment_session_id) {
        throw new Error('Could not create payment session.');
      }

      const paymentSessionId = order.payment_session_id;
      const orderId = order.order_id;

      // --- FIX 2: Handle the result of the checkout ---
      const result = await cashfree.checkout({
        paymentSessionId,
        returnUrl: `${process.env.NEXT_PUBLIC_LOCAL_URL}/checkout?step=3&orderId=${orderId}`,
      });

      if (result.error) {
        // Handle payment error
        throw new Error(result.error.message);
      }
      if (result.payment && result.payment.status === 'SUCCESS') {
        // This is what triggers the redirect to step 3
        navigateToStep(3);
      }
      // If user closes modal, result.payment will be 'FAILED' or similar
      // The finally block will just reset the button.
      
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      // --- FIX 3: Add the 'finally' block back ---
      // This ensures the button is re-enabled if the user
      // closes the modal or if an error occurs.
      setIsLoading(false);
    }
  };

  if (!selectedCourse) {
    return <div>Error: Course not found.</div>;
  }

  return (
    <div className="grid w-full max-w-screen-lg grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
      <div>
        <CoursePreview course={selectedCourse} />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Complete Your Purchase
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Order Summary</h4>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {selectedCourse.title}
              </span>
              <span className="font-semibold">
                ₹{selectedCourse.price?.toFixed(2)}
              </span>
            </div>
            <hr />
            <div className="flex items-center justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-primary">
                ₹{selectedCourse.price?.toFixed(2)}
              </span>
            </div>
          </div>

          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}

          <Button
            size="lg"
            className="w-full"
            onClick={handlePayment}
            disabled={!cashfree || isLoading || isCreatingOrder}
          >
            {isLoading || isCreatingOrder ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <ShieldCheck className="mr-2 h-5 w-5" />
            )}
            Pay Securely
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Powered by Cashfree. Test Mode Active.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentPage;

