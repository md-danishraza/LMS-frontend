'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetOrderStatusQuery } from '@/state/apis/paymentApi';
import Loader from '@/components/Loader';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

function CompletionPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { user } = useUser();
  
  const [status, setStatus] = useState('PENDING');
  const [pollingCount, setPollingCount] = useState(0);

  // Poll the backend for the order status
  const { data, isError } = useGetOrderStatusQuery(
    { userId: user?.id!, orderId: orderId! },
    {
      pollingInterval: 3000, // Check every 3 seconds
      skip: !orderId || !user?.id || status !== 'PENDING' || pollingCount > 40, // Stop after 2 minutes
    }
  );
  console.log(data?.status)

  useEffect(() => {
    if (data?.status) {
      setStatus(data.status);
    }
  }, [data]);

  useEffect(() => {
    if (status === 'PENDING') {
      const interval = setInterval(() => {
        setPollingCount((prev) => prev + 1);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Timeout after 2 minutes
  useEffect(() => {
    if (pollingCount > 40 && status === 'PENDING') {
      setStatus('TIMEOUT');
    }
  }, [pollingCount, status]);

  if (!orderId || !user) {
    return (
      <div className="text-center text-destructive">
        <XCircle className="mx-auto h-16 w-16" />
        <h1 className="mt-4 text-3xl font-bold">Invalid Page</h1>
        <p className="mt-2 text-muted-foreground">
          No order ID was found.
        </p>
      </div>
    );
  }

  if (status === 'PENDING') {
    return (
      <div className="text-center">
        <Loader />
        <h1 className="mt-4 text-3xl font-bold">
          Verifying Your Payment...
        </h1>
        <p className="mt-2 text-muted-foreground">
          Please do not close this page. This may take a moment.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Checking status... ({pollingCount * 3}s)
        </p>
      </div>
    );
  }

  if (status === 'SUCCESS') {
    return (
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold">Payment Successful!</h1>
        <p className="mt-2 text-muted-foreground">
          You are now enrolled in the course.
        </p>
        <Button asChild className="mt-6">
          <Link href="/user/courses">Go to My Courses</Link>
        </Button>
      </div>
    );
  }

  if (status === 'TIMEOUT') {
    return (
      <div className="text-center text-yellow-600">
        <XCircle className="mx-auto h-16 w-16" />
        <h1 className="mt-4 text-3xl font-bold">Payment Verification Timeout</h1>
        <p className="mt-2 text-muted-foreground">
          Your payment may still be processing. Please check your email or contact support.
        </p>
        <Button asChild className="mt-6">
          <Link href="/user/courses">Go to My Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center text-destructive">
      <XCircle className="mx-auto h-16 w-16" />
      <h1 className="mt-4 text-3xl font-bold">Payment Failed</h1>
      <p className="mt-2 text-muted-foreground">
        {isError ? 'Your payment could not be verified.' : 'Your payment could not be processed.'}
      </p>
      <Button variant="outline" asChild className="mt-6">
        <Link href="/checkout?step=2">Try Again</Link>
      </Button>
    </div>
  );
}

export default CompletionPage;
