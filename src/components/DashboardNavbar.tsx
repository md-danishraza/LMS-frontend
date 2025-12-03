'use client';
import Link from 'next/link';
import React from 'react';
import { Bell, BookOpen, LayoutGrid } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { SidebarTrigger } from './ui/sidebar';
import { cn } from '@/lib/utils';

function DashboardNavbar({ isCoursePage }: { isCoursePage: boolean }) {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType as 'student' | 'teacher';

  return (
    // Navbar is sticky, full-width, and has a backdrop blur for a modern feel
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur-sm">
      {/* A container provides responsive padding and centers content.
        h-20 sets a consistent height.
      */}
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        
        {/* Left Side */}
        <div className="flex items-center gap-2">
          {/* This trigger shows the ChapterSidebar on mobile */}
          <SidebarTrigger
            name="chapter-sidebar" // This must match the name in ChapterSidebar
            className={cn('md:hidden', {
              hidden: !isCoursePage, // Only show on course pages
            })}
          >
            <LayoutGrid className="h-5 w-5" />
          </SidebarTrigger>

          {/* This trigger shows the AppSidebar on mobile */}
          <SidebarTrigger
            name="app-sidebar" // This must match the name in AppSidebar
            className={cn('md:hidden', {
              hidden: isCoursePage, // Hide if we're on a course page
            })}
          />
          
          {/* Search bar is hidden on mobile, visible on desktop */}
          <div className="items-center gap-4">
            <div className="relative group">
              <Link
                href={`/search`}
                className="pl-10 sm:pl-14 pr-6 sm:pr-10 py-3 sm:py-4 rounded-xl bg-muted hover:text-muted-foreground transition-all duration-300 text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Search Courses</span>
                <span className="sm:hidden">Search</span>
              </Link>
              <BookOpen
                size={18}
                className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-primary transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center cursor-pointer">
                {/* Use primary color for the notification dot */}
                <span className="absolute top-0 right-0 bg-primary h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full"></span>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-full h-full p-0"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="end" className="w-64 p-4">
              {/* Popover content... */}
              <div className="space-y-3 text-sm">
                <div className="font-medium">🔔 New feature deployed</div>
                <div className="text-muted-foreground">
                  Dark mode now supports blur transitions.
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <ModeToggle />
          <SignedIn>
            {/* Your detailed UserButton styling is preserved */}
            <UserButton
              showName={true}
              userProfileMode="navigation"
              userProfileUrl={
                userRole === 'teacher' ? '/teacher/profile' : '/user/profile'
              }
              appearance={{
                elements: {
                  userButtonPopoverCard:
                    'bg-popover border border-border shadow-lg rounded-lg p-1 [&_*]:!text-popover-foreground',
                  userButtonPopoverActionButton:
                    'px-3 py-2 text-sm !text-foreground hover:bg-accent hover:!text-accent-foreground rounded-md transition-colors',
                  userButtonPopoverActionButton__signOut:
                    '!text-destructive hover:bg-destructive/10 hover:!text-destructive',
                  userButtonPopoverFooter: 'hidden',
                  userButtonOuterIdentifier: "hidden md:block",
                  // ...all your other custom styles...
                },
                variables: {
                  colorPrimary: 'hsl(var(--primary))',
                  colorBackground: 'hsl(var(--popover))',
                  colorText: 'hsl(var(--popover-foreground))',
                  colorDanger: 'hsl(var(--destructive))',
                  borderRadius: 'var(--radius)',
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
