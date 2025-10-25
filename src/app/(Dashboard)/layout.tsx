'use client'
import React, { useState } from 'react'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/AppSidebar'
import DashboardNavbar from '@/components/DashboardNavbar'
function layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [courseId,setCourseId] = useState<string|null>(null);
    const {user,isLoaded} = useUser();

    // handle useEffect for isCourse page - will show extra sidebar
    // main sidebar will be collapsed


    if(!isLoaded) return <Loader/>
    if(!user) return <h1 className='text-4xl text-center text-red-500'>Please Sign in to Access this page.</h1>
  return (
    <SidebarProvider>
    <div className="flex bg-background min-h-screen w-full">
    {/* app side bar */}
    <AppSidebar/>
    <div className="flex flex-1 overflow-hidden">
        {/* chapter sidebar */}

        <div className={cn(
             'flex-grow min-h-screen flex flex-col transition-all duration-500 ease-in-out overflow-y-auto ',
        )}>
          {/* dashoard navbar */}
            <DashboardNavbar isCoursePage={false}/>
            <main className='px-8 py-4'>
            {children}
            </main>
            <Footer/>
        </div>
        
    </div>
  </div>
  </SidebarProvider>
  )
}

export default layout
