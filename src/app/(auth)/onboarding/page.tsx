'use client';

import React, { useEffect, useState } from 'react';
import { useUser,useSession } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

import { updateUserRole } from './_actions/onboading-action'; 


export default function OnboardingPage() {
  const { user } = useUser();
  const { session } = useSession(); 
  const router = useRouter();
  
  useEffect(()=>{
    if(!user){
      return router.push("/")
    }
  },[])
  
 
  const [userType, setUserType] = useState<'student' | 'teacher' | ''>('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const handleRoleSubmit = async () => {
    if (!user || !userType) return;

    setIsLoading(true);
    setError(null);
    try {
      // 1. Call the Server Action
      const result = await updateUserRole(userType);
      console.log(result);
      if (!result.success) {
        throw new Error(result.error || 'Something went wrong');
      }
      
      // 2. Refresh the user session
      await session?.reload();

      // 3. Redirect
      if (userType === 'teacher') {
        router.push('/teacher/courses');
      } else {
        router.push('/user/courses');
      }
      // On success, we DO NOT set isLoading(false).
      // We let the redirect happen, and this component will unmount.

    } catch (err) {
      // ONLY set loading to false if an error occurred.
      console.error('Error updating user metadata:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setIsLoading(false); 
    } 
    
  };
  

  return (
    <main className="flex flex-col items-center justify-center bg-muted/20 p-2">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <CardTitle className="pt-4 text-2xl">
            Welcome to ProLearn!
          </CardTitle>
          <CardDescription>
            To complete your profile, please select your role.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={userType}
            onValueChange={(value: 'student' | 'teacher') => setUserType(value)}
            className="grid grid-cols-2 gap-4"
          >
            {/* Student Option */}
            <Label
              htmlFor="student"
              className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-4 transition-colors hover:bg-accent hover:text-accent-foreground ${
                userType === 'student' ? 'border-primary' : ''
              }`}
            >
              <RadioGroupItem value="student" id="student" className="sr-only" />
              <span className="mb-2 text-2xl">🎓</span>
              <span className="font-bold">I am a Student</span>
              <span className="text-center text-sm text-muted-foreground">
                I want to enroll and learn.
              </span>
            </Label>
            
            {/* Teacher Option */}
            <Label
              htmlFor="teacher"
              className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-4 transition-colors hover:bg-accent hover:text-accent-foreground ${
                userType === 'teacher' ? 'border-primary' : ''
              }`}
            >
              <RadioGroupItem value="teacher" id="teacher" className="sr-only" />
              <span className="mb-2 text-2xl">👨‍🏫</span>
              <span className="font-bold">I am a Teacher</span>
              <span className="text-center text-sm text-muted-foreground">
                I want to teach and mentor.
              </span>
            </Label>
          </RadioGroup>

          {error && (
            <p className="text-center text-sm text-destructive">{error}</p>
          )}

          <Button
            onClick={handleRoleSubmit}
            disabled={!userType || isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

