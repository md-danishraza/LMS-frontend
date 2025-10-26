'use client'
import React, { useState } from 'react'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/AppSidebar'
import ChapterSidebar from '@/components/ChapterSidebar'
import DashboardNavbar from '@/components/DashboardNavbar'
function layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [courseId,setCourseId] = useState<string|null>(null);
    const {user,isLoaded} = useUser();

    // handle useEffect for isCourse page - will show extra sidebar
    // main sidebar will be collapsed
    const isCoursePage = pathname.includes('/courses/');


    if (!isLoaded) {
      return <Loader />;
    }
    
    if (!user) {
      return (
        <h1 className="text-4xl text-center text-destructive">
          Please Sign in to Access this page.
        </h1>
      );
    }
  return (
    <SidebarProvider>
      <div className="flex bg-background min-h-screen w-full">
        {/* AppSidebar is your main navigation. 
            We pass `isCoursePage` to it so it can collapse itself.
        */}
        <AppSidebar isCoursePage={isCoursePage} />

        {/* ChapterSidebar is conditionally rendered.
            It will only appear on course pages.
        */}
        {isCoursePage && <ChapterSidebar />}

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Navbar is now sticky at the top, outside the scrolling area.
            It's part of the flex-col layout.
          */}
          <DashboardNavbar isCoursePage={isCoursePage} />

          {/* Main content is now the ONLY scrolling part.
            - `flex-1` makes it take all available vertical space.
            - `overflow-y-auto` makes it scrollable.
            - `container` and `py-8` provide standard shadcn padding.
          */}
          <main className="flex-1 overflow-y-auto">
            <div className="container px-4 py-8 md:px-6 lg:px-8">
              {children}
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default layout
