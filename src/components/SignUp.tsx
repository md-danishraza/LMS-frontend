'use client';

import { SignUp } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';

export default function SignUpComp() {
  const { resolvedTheme } = useTheme();

  return (
    <SignUp
      appearance={{
        // Use Clerk's dark theme if the resolvedNextTheme is dark
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
    />
  );
}