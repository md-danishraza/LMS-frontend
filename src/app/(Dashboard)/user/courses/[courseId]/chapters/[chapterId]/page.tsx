'use client';

import { useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
// import ReactPlayer from 'react-player';
import Loader from '@/components/Loader';
import { useCourseProgressData } from '@/hooks/useCourseProgressData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, FileText, Video as VideoIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ChapterSidebarMobileToggle from '@/components/ChapterSidebarMobileToggle';


// 1. Import dynamic from Next.js
import dynamic from 'next/dynamic';

// 2. Dynamically import ReactPlayer with SSR disabled
// This fixes the "video not working" issue in Next.js
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as any;

const Course = () => {
  const {
    user,
    course,
    userProgress,
    currentSection,
    currentChapter,
    isLoading,
    isChapterCompleted,
    updateChapterProgress,
    hasMarkedComplete,
    setHasMarkedComplete,
  } = useCourseProgressData();

  const playerRef = useRef<any>(null); // keeping as 'any' is safest for the dynamic component ref
  const handleProgress =(state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    const { played } = state;
    // Mark as complete if 80% watched and not already marked
    if (
      played >= 0.8 &&
      !hasMarkedComplete &&
      currentChapter &&
      currentSection &&
      userProgress?.sections &&
      !isChapterCompleted()
    ) {
      setHasMarkedComplete(true);
      updateChapterProgress(
        currentSection.sectionId,
        currentChapter.chapterId,
        true
      );
    }
  };

  // console.log(currentChapter)

  if (isLoading) return <Loader />;
  
  if (!user) return (
    <div className="flex h-[50vh] items-center justify-center">
       <h2 className="text-2xl font-semibold text-destructive">Please sign in to view this course.</h2>
    </div>
  );

  if (!course || !currentChapter) return (
    <div className="flex h-[50vh] items-center justify-center">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Could not load course content. The chapter might not exist.
        </AlertDescription>
      </Alert>
    </div>
  );

  return (
    <div className="container mx-auto p-4 pb-20 max-w-7xl">
      {/* --- Breadcrumb & Header --- */}
      <div className="mb-6 relative">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
           <span className="hover:text-foreground cursor-pointer">{course.title}</span>
           <span>/</span>
           <span>{currentSection?.sectionTitle}</span>
           <span>/</span>
           <span className="text-foreground font-medium">{currentChapter.title}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{currentChapter.title}</h1>
        <ChapterSidebarMobileToggle/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* --- Left Column: Video & Content (Span 2) --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Video Player Card */}
          <Card className="overflow-hidden shadow-md border-none bg-black/95">
             <div className="relative w-full aspect-video">
                {currentChapter.video ? (
                   <ReactPlayer
                    ref={playerRef}
                    url={currentChapter.video as string}
                    controls
                    width="100%"
                    height="100%"
                    onProgress={handleProgress}
                    config={{
                      file: {
                        attributes: {
                          controlsList: 'nodownload',
                        },
                      },
                  } as any}                                 
                  />
                  
                  // native tag (works)
                  // <video controls width="600" src={currentChapter.video as string}></video>
                  
                  // minimal react player
                  // <ReactPlayer
                  //   url={currentChapter?.video as string}
                  //   controls
                  //   width="100%"
                  //   height="100%"
                  //   config={{ file: { forceVideo: true } }}
                  // />


                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-white/50 bg-zinc-900">
                     <VideoIcon className="h-16 w-16 mb-4 opacity-20" />
                     <p>No video content available for this chapter.</p>
                  </div>
                )}
             </div>
          </Card>

          {/* Course Details Tabs */}
          <Tabs defaultValue="Notes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="Notes">Notes</TabsTrigger>
              <TabsTrigger value="Resources">Resources</TabsTrigger>
              <TabsTrigger value="Quiz">Quiz</TabsTrigger>
            </TabsList>
            
            <TabsContent value="Notes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Chapter Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                   <ScrollArea className="h-[200px] w-full rounded-md border p-4 bg-muted/10">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {/* Render content. Use a markdown parser if needed later. */}
                        {currentChapter.content || "No notes provided for this chapter."}
                      </div>
                   </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="Resources">
              <Card>
                <CardHeader><CardTitle>Resources</CardTitle></CardHeader>
                <CardContent className="text-muted-foreground">
                  No downloadable resources attached.
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="Quiz">
              <Card>
                <CardHeader><CardTitle>Quiz</CardTitle></CardHeader>
                <CardContent className="text-muted-foreground">
                  No quiz available for this chapter.
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* --- Right Column: Instructor & Meta (Span 1) --- */}
        <div className="space-y-6">
           <Card>
              <CardHeader>
                 <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                       <AvatarImage src="" alt={course.teacherName} />
                       <AvatarFallback className="bg-primary/10 text-primary text-lg">
                          {course.teacherName[0]}
                       </AvatarFallback>
                    </Avatar>
                    <div>
                       <h4 className="font-semibold text-base">{course.teacherName}</h4>
                       <p className="text-xs text-muted-foreground">Course Author</p>
                    </div>
                 </div>
                 <Separator className="my-4" />
                 <div className="text-sm text-muted-foreground">
                    <p className="italic">
                       "Welcome to the course! If you have any questions, feel free to reach out in the Q&A section."
                    </p>
                 </div>
              </CardContent>
           </Card>
        </div>

      </div>
    </div>
  );
};

export default Course;