import React, { ReactNode } from 'react';
import { Logo } from '@/components/Logo'; // Adjust path as needed

function AuthLayout({ children }: { children: ReactNode }) {
  return (
  
    <main className="flex min-h-screen items-center justify-center bg-muted/20 p-4">
      
    
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg border bg-card shadow-lg md:flex-row">

        <div className="hidden flex-col items-center justify-center gap-6 bg-muted p-12 text-center md:flex md:w-1/2">
          <Logo 
            widthClass="w-[240px]" 
            heightClass="h-[80px]" 
          />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">
              Welcome to ProLearn
            </h1>
            <p className="text-muted-foreground">
              Your journey to mastery, guided by experts.
            </p>
          </div>
        </div>

       
        <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2 md:p-12">
          
          {/* Mobile Logo*/}
          <div className="mb-8 md:hidden">
            <Logo 
              widthClass="w-[140px]" 
              heightClass="h-[40px]" 
            />
          </div>
          
          {/* clerk auth card*/}
          {children}
        </div>
        
      </div>
    </main>
  );
}

export default AuthLayout;