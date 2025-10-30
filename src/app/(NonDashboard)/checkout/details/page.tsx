'use client'
import Loader from '@/components/Loader';
import { useCurrentCourse } from '@/hooks/useCurrentCourse';
import SignInComp from '@/components/SignIn';
import SignUpComp from '@/components/SignUp';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import CoursePreview from '@/components/CoursePreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { useCheckoutNavigation } from '@/hooks/useCheckoutNavigation';

function CheckoutDetailsPage() {
    // get current course 
  const { course: selectedCourse, isLoading, isError } = useCurrentCourse();
    // console.log(selectedCourse)
  const searchParams = useSearchParams();
  const showSignUp = searchParams.get("showSignUp") === "true";
//   get current user
  const {  isLoaded, isSignedIn, user } = useUser();
//   get step navigation function
  const {navigateToStep} = useCheckoutNavigation()


  // Show loader until both Clerk and course data are ready
  if (!isLoaded || (isLoading && !selectedCourse)) {
    return <Loader />;
  }

// //    render auth components if the user is not signed in.
//   if (!isSignedIn) {
//     return showSignUp ? <SignUpComp /> : <SignInComp />;
//   }

//   error cases
  if (isError) return <div className='text-4xl text-center text-destructive'>Failed to fetch course data</div>;
  if (!selectedCourse) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-destructive">
          Error: Course Not Found
        </h2>
        <p className="text-muted-foreground">
          This course could not be loaded. Please go back and try again.
        </p>
      </div>
    );
  }


  return (
    <div className="grid w-full max-w-screen-lg grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
      
      {/* --- Column 1: Course & Order Details (Always Visible) --- */}
      <CoursePreview course={selectedCourse}/>

      {/* --- Column 2: Auth or Action (Conditional) --- */}
      <div className="w-full flex justify-center">
        {!isSignedIn ? (
          // --- State 1: User is SIGNED OUT ---
          // Show auth cards. mt-8 on mobile, 0 on desktop
          <div className="mt-8 md:mt-0">
            {showSignUp ? <SignUpComp /> : <SignInComp />}
          </div>
        ) : (
          // --- State 2: User is SIGNED IN ---
          // Show account details and payment button
          <Card className="shadow-lg w-full h-fit">
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tight">
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-lg text-muted-foreground">
                  You are signed in as:
                </p>
                <span className="text-xl font-medium text-foreground">
                  {user?.fullName || user?.emailAddresses[0].emailAddress}
                </span>
              </div>
              <Separator />
              <Button
                size="lg"
                className="w-full"
                onClick={() => navigateToStep(2)}
              >
                Continue to Payment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default CheckoutDetailsPage
