'use client'

import { useClerk, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import Loader from './Loader'

import {
    BookOpen,
    Briefcase,
    DollarSign,
    LogOut,
    PanelLeft,
    Settings,
    User,
  } from "lucide-react";
import { Logo } from './Logo'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function AppSidebar() {
    const {user,isLoaded} = useUser()
    // singout fn
    const {signOut} = useClerk()
    // pathname
    const pathname = usePathname();

    // toggle sidebar from shadcn
    const {toggleSidebar} = useSidebar()

    // nav links
    const navLinks = {
        student: [
          { icon: BookOpen, label: "Courses", href: "/user/courses" },
          { icon: Briefcase, label: "Billing", href: "/user/billing" },
          { icon: User, label: "Profile", href: "/user/profile" },
          { icon: Settings, label: "Settings", href: "/user/settings" },
        ],
        teacher: [
          { icon: BookOpen, label: "Courses", href: "/teacher/courses" },
          { icon: DollarSign, label: "Billing", href: "/teacher/billing" },
          { icon: User, label: "Profile", href: "/teacher/profile" },
          { icon: Settings, label: "Settings", href: "/teacher/settings" },
        ],
    };

    if(!isLoaded) return <Loader/>
    if(!user) return <h1 className='text-4xl text-center text-red-500'>User Not Found!</h1>


    // getting user type
    const userType = (user.publicMetadata.userType as "student"|"teacher") || "student";
    // setting links based on userType
    const currentNavLinks = navLinks[userType]

    return (
       <Sidebar
       collapsible='icon'
       style={{height:"100vh"}}
       className='bg-background border-none shadow-lg'
       >
        <SidebarHeader>
            <SidebarMenu className='mt-5 group-data-[collapsible=icon]:mt-7'>
                <SidebarMenuItem>
                    <SidebarMenuButton
                    size="lg"
                    onClick={()=>toggleSidebar()}
                    className='group hover:bg-secondary'
                    >   
                        {/* logo and toggle icon */}
                        <div className='flex justify-between items-center gap-5 pl-3 pr-1 h-10 w-full group-data-[collapsible=icon]:ml-1 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:px-0'>
                        </div>
                        <Logo />
                        <PanelLeft />
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        {/* content links */}
        <SidebarContent>
            <SidebarMenu className="mt-7 gap-0">
            {currentNavLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <SidebarMenuItem
                key={link.href}
                className={cn(
                  " group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:py-4",
                  isActive && "bg-secondary"
                )}
              >
                <SidebarMenuButton
                  asChild
                  size="lg"
                  className={cn(
                    "gap-4 p-8 hover:bg-secondary group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center",
                    !isActive && "text-customgreys-dirtyGrey"
                  )}
                >
                  <Link
                    href={link.href}
                    className="relative flex items-center"
                    scroll={false}
                  >
                    <link.icon
                      className={isActive ? "text-white-50" : "text-gray-500"}
                    />
                    <span
                      className={cn(
                        "font-medium text-md ml-4 group-data-[collapsible=icon]:hidden",
                        isActive ? "text-white-50" : "text-gray-500"
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
                {/* indicator bar column */}
                {isActive && <div className="absolute right-0 top-0 h-full w-[4px] bg-primary" />}
              </SidebarMenuItem>
            );
          })}
            </SidebarMenu>
        </SidebarContent>
        {/* footer- singout */}
        <SidebarFooter>
            <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                <button
                    onClick={() => signOut()}
                    className="text-primary-700 pl-8"
                >
                    <LogOut className="mr-2 h-6 w-6" />
                    <span>Sign out</span>
                </button>
                </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
       </Sidebar>
    )
}

export default AppSidebar
