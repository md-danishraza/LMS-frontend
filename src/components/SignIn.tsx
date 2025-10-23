'use client';

import { SignIn } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';

export default function SignInComp() {
  const { resolvedTheme } = useTheme();

  return (
    <SignIn
      appearance={{
        // Use Clerk's dark theme if the resolvedNextTheme is dark
        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        variables: {
          // Override Clerk's colors with your shadcn CSS variables
          colorPrimary: 'hsl(var(--primary))',
          colorText: 'hsl(var(--foreground))',
          colorBackground: 'hsl(var(--background))',
          colorInputBackground: 'hsl(var(--input))',
          colorInputText: 'hsl(var(--foreground))',
        },
        elements: {
          // Style the card to match shadcn's card
          card: 'bg-card text-card-foreground border-border shadow-lg',
          // Style the primary button
          formButtonPrimary:
            'bg-primary text-primary-foreground hover:bg-primary/90',
          // Style the form fields
          formFieldInput:
            'bg-input border-border focus:ring-primary focus:ring-2',
          // Style the "Sign up" link at the bottom
          footerActionLink: 'text-primary hover:text-primary/90',
          // This hides the default Clerk logo
          logoBox: 'hidden',
        },
      }}
    />
  );
}