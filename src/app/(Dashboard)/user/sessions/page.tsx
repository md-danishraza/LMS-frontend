'use client';

import HeaderProfile from '@/components/HeaderProfile';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Video, CalendarPlus, Clock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useGetUserEnrolledCoursesQuery } from '@/state/apis/courseApi';
import { useUser } from '@clerk/nextjs';
import Loader from '@/components/Loader';
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { 
  useCreateMentorshipSessionMutation, 
  useGetUserMentorshipSessionsQuery 
} from '@/state/apis/mentorshipApi';
import { toast } from 'sonner';

export default function StudentSessionsPage() {
  const { user, isLoaded } = useUser();
  
  // 1. Fetch courses the student is enrolled in
  const { data: courses, isLoading: isCoursesLoading } = useGetUserEnrolledCoursesQuery(user?.id ?? '', {
    skip: !isLoaded || !user,
  });

  // 2. Fetch existing sessions for this student
  const { data: sessions, isLoading: isSessionsLoading } = useGetUserMentorshipSessionsQuery(
    { userId: user?.id ?? '', type: 'student' },
    { skip: !isLoaded || !user }
  );

  // 3. Setup mutation for creating a new session
  const [createSession, { isLoading: isCreating }] = useCreateMentorshipSessionMutation();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // We store the full course object here to access teacherId during scheduling
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  const handleSchedule = async () => {
    if (!date || !selectedCourse || !user) return;

    const scheduledDate = new Date(date);

    // setting timings to be end of day for both current date and future date
    scheduledDate.setHours(23, 59, 59, 999);

    try {
      await createSession({
        studentId: user.id,
        teacherId: selectedCourse.teacherId, // Accessing teacherId from course
        courseId: selectedCourse.courseId,
        date: date.toISOString(),
      }).unwrap();

      toast.success("Session scheduled successfully!");
      setIsDialogOpen(false);
      setSelectedCourse(null);
    } catch (error) {
      console.error("Failed to schedule session:", error);
      toast.error("Failed to schedule session. Please try again.");
    }
  };

  if (!isLoaded || isCoursesLoading || isSessionsLoading) return <Loader />;
  
  if (!user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
         <h2 className="text-2xl font-semibold text-destructive">Please sign in to view sessions.</h2>
      </div>
    );
  }

  return (
    <div className="w-full h-full space-y-6">
      <HeaderProfile
        title="Mentorship Sessions"
        subtitle="Connect live with your instructors for personalized guidance."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course) => {
          // Check if this course has an active session in the fetched data
          // Filter for 'scheduled' sessions specifically
          const activeSession = sessions?.find(
            (s) => s.courseId === course.courseId && s.status === 'scheduled'
          );
          
          return (
            <Card key={course.courseId} className="flex flex-col justify-between hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
                <div className="flex flex-col gap-1">
                  <CardTitle className="text-base line-clamp-1" title={course.title}>
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Instructor: {course.teacherName}
                  </CardDescription>
                </div>
                <Avatar className="h-10 w-10 border bg-muted">
                  <AvatarImage src="" /> 
                  <AvatarFallback>{course.teacherName[0]}</AvatarFallback>
                </Avatar>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="mb-4 mt-2">
                  {activeSession ? (
                    <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 p-2 rounded-md border border-primary/20">
                      <Clock className="h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="font-medium leading-none">Scheduled</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {format(new Date(activeSession.date), 'PPP p')}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-muted/30 rounded-md border border-transparent">
                      <CalendarPlus className="h-4 w-4 opacity-50" />
                      <span>No upcoming sessions</span>
                    </div>
                  )}
                </div>

                {activeSession ? (
                  <Button asChild className="w-full gap-2 transition-transform active:scale-95">
                    <Link href={`/user/sessions/${activeSession.sessionId}`}>
                      <Video className="h-4 w-4" />
                      Join Session
                    </Link>
                  </Button>
                ) : (
                  <Dialog 
                    open={isDialogOpen && selectedCourse?.courseId === course.courseId} 
                    onOpenChange={(open) => {
                      setIsDialogOpen(open);
                      if (!open) setSelectedCourse(null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full gap-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5"
                        onClick={() => setSelectedCourse(course)}
                      >
                        <CalendarPlus className="h-4 w-4" />
                        Schedule Session
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Schedule Mentorship</DialogTitle>
                        <DialogDescription>
                          Choose a date to meet with <strong>{course.teacherName}</strong>.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="flex justify-center py-4">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border shadow-sm"
                          disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))} 
                        />
                      </div>

                      <DialogFooter>
                        <Button onClick={handleSchedule} disabled={!date || isCreating}>
                          {isCreating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Scheduling...
                            </>
                          ) : (
                            "Confirm Booking"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          );
        })}
        
        {courses?.length === 0 && (
           <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground bg-muted/10 rounded-xl border border-dashed">
             <CalendarPlus className="h-12 w-12 mb-4 opacity-20" />
             <p>You need to enroll in a course before you can book mentorship sessions.</p>
             <Button variant="link" asChild className="mt-2">
               <Link href="/search">Browse Courses</Link>
             </Button>
           </div>
        )}
      </div>
    </div>
  );
}