'use client';

import { SignUp,useUser } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';

export default function SignUpComp() {
  const { resolvedTheme } = useTheme();

  const {user} = useUser()
  const searchParams = useSearchParams()
  // check whether current page is for checkout or not
  // only available for checkout page
  const isCheckoutPage = searchParams.get("showSignUp") !== null;
  const courseId = searchParams.get("id")

  // if not checkout page then replace signin with signup else go to seperate auth page
  const signInUrl = isCheckoutPage ? `/checkout?step=1&id=${courseId}&showSignUp=false` : "/signin"
  // console.log(signUpUrl)

  // redirects after signup 
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

      signInUrl={signInUrl}
      forceRedirectUrl={getRedirectUrl()}
      routing='hash'
      afterSignOutUrl="/"
    />
  );
}