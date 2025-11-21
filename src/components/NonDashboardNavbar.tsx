'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Bell, BookOpen, LogIn, UserPlus,ChevronDown,ChevronUp, LayoutDashboard  } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Logo } from './Logo';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';

function NonDashboardNavbar() {
    const [isOpen, setIsOpen] = useState(false);
   
    const {user} = useUser()
    const userRole = user?.publicMetadata?.userType as "student"|"teacher";


    // --- DYNAMIC LINK LOGIC ---
    // Default to Search (Guest)
    let navbarLink = {
      href: '/search',
      label: 'Search Courses',
      icon: BookOpen,
    };

    if (user) {
      if (userRole === 'teacher') {
        navbarLink = {
          href: '/teacher/courses',
          label: 'Dashboard',
          icon: LayoutDashboard,
        };
      } else if (userRole === 'student') {
        navbarLink = {
          href: '/user/courses',
          label: 'My Courses',
          icon: BookOpen,
        };
      }
    }
  
  return (
    <nav className='w-full px-4 flex justify-center bg-background border-b shadow
    '>
            {/* left side */}
        <div className='flex justify-between items-center w-3/4 py-8 '>
            <div className='flex justify-between items-center gap-14'>
            {/* brand logo */}
            {/* <Link href={`/`} className='font-bold text-lg text-primary sm:text-xl hover:text-secondary'>
            LMS
            </Link>  */}
            <Logo/>

            {/* --- DYNAMIC BUTTON --- */}
              <div className="hidden items-center gap-4 md:flex">
                <div className="relative group">
                  <Link
                    href={navbarLink.href}
                    className="pl-10 sm:pl-14 pr-6 sm:pr-10 py-3 sm:py-4 rounded-xl bg-muted hover:text-muted-foreground transition-all duration-300 text-sm sm:text-base"
                  >
                    <span className="hidden sm:inline">{navbarLink.label}</span>
                    <span className="sm:hidden">
                      {navbarLink.label === 'Search Courses' ? 'Search' : 'Courses'}
                    </span>
                  </Link>
                  <navbarLink.icon
                    size={18}
                    className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-primary transition-all duration-300"
                  />
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
                    <Button variant="outline" size="icon" className="w-full h-full p-0 cursor-pointer">
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
            {/* theme toggle */}
            <ModeToggle/>

            {/* sign in btns */}
            <SignedIn>
            <UserButton
            showName={true}
            userProfileMode="navigation"
            userProfileUrl={
              userRole === 'teacher' ? '/teacher/profile' : '/user/profile'
            }
            appearance={{
              elements: {
                // Avatar and trigger - remove ring
                avatarBox: 'w-9 h-9',
                userButtonAvatarBox: 'w-9 h-9',
                userButtonBox: 'focus:shadow-none focus:outline-none focus:ring-0',
                userButtonTrigger: 
                  'focus:shadow-none focus:outline-none focus:ring-0 hover:opacity-80 transition-opacity',
                
                // User name next to avatar
                userButtonOuterIdentifier: 
                'text-sm font-primary font-medium text-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]',

                // Dropdown menu - force text colors
                userButtonPopoverCard: 
                  'bg-popover border border-border shadow-lg rounded-lg p-1 [&_*]:!text-popover-foreground',
                userButtonPopoverMain: 
                  'bg-transparent',
                
                // Header section with user info
                userButtonPopoverHeader: 
                  'pb-2 mb-2 border-b border-border',
                userButtonPopoverUserPreview: 
                  'p-2',
                userButtonPopoverUserPreviewMainIdentifier: 
                  'text-sm font-medium !text-foreground',
                userButtonPopoverUserPreviewSecondaryIdentifier: 
                  'text-xs !text-muted-foreground',
                
               
                userButtonPopoverActionButton: 
                  'px-3 py-2 text-sm !text-foreground hover:bg-accent hover:!text-accent-foreground rounded-md transition-colors',
                userButtonPopoverActionButtonIcon: 
                  'w-4 h-4 !text-muted-foreground',
                userButtonPopoverActionButtonText: 
                  'text-sm !text-foreground',
                
                // Sign out button
                userButtonPopoverActionButton__signOut: 
                  '!text-destructive hover:bg-destructive/10 hover:!text-destructive',
                
                // Remove footer
                userButtonPopoverFooter: 'hidden',
              },
              variables: {
                colorPrimary: 'hsl(var(--primary))',
                colorBackground: 'hsl(var(--popover))',
                colorText: 'hsl(var(--popover-foreground))', 
                colorTextSecondary: 'hsl(var(--muted-foreground))',
                colorDanger: 'hsl(var(--destructive))',
                borderRadius: 'var(--radius)',
              },
            }}
          />

          </SignedIn>

          <SignedOut>
            {/* New Dropdown for Sign In / Sign Up */}
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild >
                <Button className='cursor-pointer' >Get In 
                {isOpen ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    href="/signin"
                    className="flex w-full items-center gap-2 cursor-pointer"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/signup"
                    className="flex w-full items-center gap-2 cursor-pointer"
                    >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedOut>
        </div>
    </nav>
  )
}

export default NonDashboardNavbar
