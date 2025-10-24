'use client';

import { SignUp, useUser } from '@clerk/nextjs'; // useUser is no longer needed here for redirects
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';
import { useSearchParams } from 'next/navigation';

export default function SignUpComp() {
  const { resolvedTheme } = useTheme();
  const searchParams = useSearchParams();

  const isCheckoutPage = searchParams.get('showSignUp') !== null;
  const courseId = searchParams.get('id');

  const signInUrl = isCheckoutPage
    ? `/checkout?step=1&id=${courseId}&showSignUp=false`
    : '/signin';

  // REDIRECT LOGIC FOR SIGN UP
  const getRedirectUrl = () => {
    // If sign up is done from checkout page, go to next step
    if (isCheckoutPage) {
      return `/checkout?step=2&id=${courseId}`;
    }
    
    // For ALL other sign-ups, send to onboarding
    return '/onboarding';
  };

  return (
    <SignUp
      appearance={{
        // ... your theme appearance ...
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
          footerActionLink: 'text-primary hover:text-primary/90',
          logoBox: 'hidden',
        },
      }}
      signInUrl={signInUrl}
      // Use afterSignUpUrl, not forceRedirectUrl
      fallbackRedirectUrl={getRedirectUrl()}
      routing="hash"
      afterSignOutUrl="/"
    />
  );
}