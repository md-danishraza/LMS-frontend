import Link from 'next/link'
import React from 'react'
import { Bell, BookOpen } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';


import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Logo } from './Logo';
function NonDashboardNavbar() {
  return (
    <nav className='w-full flex justify-center bg-background border-b shadow
    '>
            {/* left side */}
        <div className='flex justify-between items-center w-3/4 py-8 '>
            <div className='flex justify-between items-center gap-14'>
            {/* brand logo */}
            {/* <Link href={`/`} className='font-bold text-lg text-primary sm:text-xl hover:text-secondary'>
            LMS
            </Link>  */}
            <Logo/>

            <div className='flex items-center gap-4'>
                <div className='relative group '>
                    <Link href={`/search`} className='pl-10 sm:pl-14 pr-6 sm:pr-10 py-3 sm:py-4 rounded-xl bg-muted hover:text-muted-foreground transition-all duration-300 text-sm sm:text-base'>
                        <span className='hidden sm:inline'>Search Courses</span>
                        <span className='sm:hidden'>Search</span>
                    </Link>
                    <BookOpen size={18} className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-primary transition-all duration-300"/>
                </div>
            </div>
            </div>
        </div>
        {/* non dashboard  - right side */}
        <div className='flex items-center gap-2 sm:gap-2'>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="relative w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center cursor-pointer">
                    <span className="absolute top-0 right-0 bg-blue-500 h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full"></span>
                    <Button variant="outline" size="icon" className="w-full h-full p-0">
                        <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    </div>
                </PopoverTrigger>

                <PopoverContent side="bottom" align="end" className="w-64 p-4">
                    <div className="space-y-3 text-sm">
                    <div className="font-medium">🔔 New feature deployed</div>
                    <div className="text-muted-foreground">Dark mode now supports blur transitions.</div>
                    <hr />
                    <div className="font-medium">📦 3 new products packed</div>
                    <div className="text-muted-foreground">Check your dashboard for details.</div>
                    <hr />
                    <div className="font-medium">🎉 Welcome back!</div>
                    <div className="text-muted-foreground">Your theme settings were restored.</div>
                    </div>
                </PopoverContent>
            </Popover>
            <ModeToggle/>

            {/* sign in btns */}
        </div>
    </nav>
  )
}

export default NonDashboardNavbar
