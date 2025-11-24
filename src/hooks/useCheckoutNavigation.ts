"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export const useCheckoutNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn } = useUser();

  const courseId = searchParams.get("id") ?? "";
  //   get current step default is 1
  const checkoutStep = parseInt(searchParams.get("step") ?? "1", 10);

  //   take next step
  // memoizing it so it change only when theres changes in dependency
  // and not on refresh
  const navigateToStep = useCallback(
    (step: number) => {
      // new 1<=step<=3
      const newStep = Math.min(Math.max(1, step), 3);
      const showSignUp = isSignedIn ? "true" : "false";

      router.push(
        `/checkout?step=${newStep}&id=${courseId}&showSignUp=${showSignUp}`,
        {
          scroll: false,
        }
      );
    },
    [courseId, isSignedIn, router]
  );

  //   if not signed in than navigate to step 1
  // where clerk signin/up card will be shown
  useEffect(() => {
    if (isLoaded && !isSignedIn && checkoutStep > 1) {
      navigateToStep(1);
    }
  }, [isLoaded, isSignedIn, checkoutStep, navigateToStep]);

  return { checkoutStep, navigateToStep };
};
