'use client';

import HeaderProfile from '@/components/HeaderProfile';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Video, Calendar as CalendarIcon, History, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import Loader from '@/components/Loader';
import { useGetUserMentorshipSessionsQuery } from '@/state/apis/mentorshipApi';
import { useGetTeacherCoursesQuery } from '@/state/api';
import { useMemo } from 'react';

export default function TeacherSessionsPage() {
  const { user, isLoaded } = useUser();
  
  // 1. Fetch all sessions for this teacher
  const { 
    data: sessions, 
    isLoading: isSessionsLoading,
    isError 
  } = useGetUserMentorshipSessionsQuery(
    { userId: user?.id ?? '', type: 'teacher' },
    { skip: !isLoaded || !user }
  );

  // 2. Fetch teacher's courses to resolve course titles from courseIds
  const { data: courses, isLoading: isCoursesLoading } = useGetTeacherCoursesQuery(undefined, {
    skip: !isLoaded || !user,
  });

  // 3. Process and split sessions
  const { upcomingSessions, pastSessions } = useMemo(() => {
    if (!sessions) return { upcomingSessions: [], pastSessions: [] };
  
    // Create a reference date for "Start of Today"
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
  
    const upcoming: any[] = [];
    const past: any[] = [];
  
    sessions.forEach((session) => {
      const sessionDate = new Date(session.date);
      
      // Find course title
      const course = courses?.find(c => c.courseId === session.courseId);
      const courseTitle = course?.title || 'Unknown Course';
  
      // Combine session data with UI-ready details
      const sessionWithDetails = {
        ...session,
        courseTitle,
        studentName: 'Student', 
        studentAvatar: '',
      };
  
      // --- FIX: Logic Logic ---
      // If the session is Today (any time) or Future, it goes to Upcoming.
      // >= comparisons work perfectly because we reset 'startOfToday' to 00:00:00.
      if (sessionDate >= startOfToday) {
        upcoming.push(sessionWithDetails);
      } else {
        past.push(sessionWithDetails);
      }
    });
  
    // Sort upcoming by date (soonest first)
    upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    // Sort past by date (most recent first)
    past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
    return { upcomingSessions: upcoming, pastSessions: past };
  }, [sessions, courses]);

  if (!isLoaded || isSessionsLoading || isCoursesLoading) return <Loader />;
  
  if (!user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
         <h2 className="text-2xl font-semibold text-destructive">Please sign in to manage sessions.</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
         <h2 className="text-2xl font-semibold text-destructive">Error loading sessions.</h2>
      </div>
    );
  }

  return (
    <div className="w-full h-full space-y-6">
      <HeaderProfile
        title="Mentorship Dashboard"
        subtitle="Manage your upcoming sessions and connect with students."
      />

      <div className="space-y-10">
        
        {/* --- Upcoming Sessions --- */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => (
                <Card key={session.sessionId} className="flex flex-col justify-between hover:shadow-md transition-shadow border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-1" title={session.courseTitle}>
                      {session.courseTitle}
                    </CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {format(new Date(session.date), 'PPP p')}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center gap-3 mb-6 p-3 bg-muted/50 rounded-lg">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={session.studentAvatar} /> 
                        <AvatarFallback>S</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold truncate max-w-[150px]">
                            {session.studentName}
                        </span>
                        <span className="text-xs text-muted-foreground">Student</span>
                      </div>
                    </div>

                    <Button asChild className="w-full gap-2">
                      <Link href={`/teacher/sessions/${session.sessionId}`}>
                        <Video className="h-4 w-4" />
                        Join Call
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground bg-muted/10 rounded-xl border border-dashed">
                <CalendarIcon className="h-10 w-10 mb-3 opacity-20" />
                <p>No upcoming sessions scheduled.</p>
              </div>
            )}
          </div>
        </section>

        {/* --- Past Sessions --- */}
        {pastSessions.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4 text-muted-foreground">
              <History className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Past Sessions</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 opacity-75 hover:opacity-100 transition-opacity">
              {pastSessions.map((session) => (
                <Card key={session.sessionId} className="bg-muted/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-muted-foreground line-clamp-1">
                      {session.courseTitle}
                    </CardTitle>
                    <CardDescription>
                      {format(new Date(session.date), 'PPP p')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">S</AvatarFallback>
                      </Avatar>
                      <span>{session.studentName}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}