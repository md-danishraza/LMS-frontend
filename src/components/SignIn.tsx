'use client';

import { SignIn,useUser } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';
import { useSearchParams } from 'next/navigation';

export default function SignInComp() {
  const { resolvedTheme } = useTheme();

  const {user} = useUser()
  const searchParams = useSearchParams()
  // check whether current page is for checkout or not
  // only available for checkout page
  const isCheckoutPage = searchParams.get("showSignUp") !== null;
  const courseId = searchParams.get("id")

  // if not checkout page then replace signin with signup else go to seperate auth page
  const signUpUrl = isCheckoutPage ? `/checkout?step=1&id=${courseId}&showSignUp=true` : "/signup"
  // console.log(signUpUrl)

  // redirects after signin
  const getRedirectUrl = ()=>{
    // if done from checkout page than next step
    if(isCheckoutPage){
      return `/checkout?step=2&id=${courseId}`
    }

    const userType = user?.publicMetadata?.userType as string;
    // if user|student
    if(userType == "student"){
      return `/user/courses`
    }
    if(userType == "teacher"){
      return `/teacher/courses`
    }
    
  }

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

      signUpUrl={signUpUrl}
      forceRedirectUrl={getRedirectUrl()}
      routing='hash'
      afterSignOutUrl="/"
    />
  );
}