'use client';

import { SignIn } from '@clerk/nextjs'; // useUser is no longer needed here
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';
import { useSearchParams } from 'next/navigation';

export default function SignInComp() {
  const { resolvedTheme } = useTheme();
  const searchParams = useSearchParams();

  const isCheckoutPage = searchParams.get('showSignUp') !== null;
  const courseId = searchParams.get('id');

  const signUpUrl = isCheckoutPage
    ? `/checkout?step=1&id=${courseId}&showSignUp=true`
    : '/signup';

  // REDIRECT LOGIC FOR SIGN IN
  const getRedirectUrl = () => {
    // If sign in is done from checkout page, go to next step
    if (isCheckoutPage) {
      return `/checkout?step=2&id=${courseId}`;
    }

    // For ALL other sign-ins, just go to the homepage.
    //  MIDDLEWARE will catch this and redirect to /onboarding
    // or /user/courses or /teacher/courses as needed.
    return '/';
  };

  return (
    <SignIn
      appearance={{
       
        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        variables: {
          colorPrimary: 'hsl(var(--primary))',
          colorText: 'hsl(var(--foreground))',
          colorBackground: 'hsl(var(--background))',
          colorInputBackground: 'hsl(var(--input))',
          colorInputText: 'hsl(var(--foreground))',
        },
        elements: {
          card: 'bg-card text-card-foreground border-border shadow-lg',
          formButtonPrimary:
            'bg-primary text-primary-foreground hover:bg-primary/90',
          formFieldInput:
            'bg-input border-border focus:ring-primary focus:ring-2',
          footerActionLink: 'text-primary hover:text-primary/9T90',
          logoBox: 'hidden',
        },
      }}
      signUpUrl={signUpUrl}
      // Use afterSignInUrl, not forceRedirectUrl
      fallbackRedirectUrl={getRedirectUrl()}
      routing="hash"
      afterSignOutUrl="/"
    />
  );
}