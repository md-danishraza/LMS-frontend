'use client'

import { useClerk, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  useSidebar 
} from '@/components/ui/sidebar'
import Loader from './Loader'
import {
  BookOpen,
  Briefcase,
  DollarSign,
  LogOut,
  PanelLeft,
  Settings,
  User,
} from "lucide-react"
import { Logo } from './Logo'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function AppSidebar({ isCoursePage }: { isCoursePage: boolean }) {
  // Get user data from Clerk authentication
  const { user, isLoaded } = useUser()
  
  // Get signOut function from Clerk to handle user logout
  const { signOut } = useClerk()
  
  // Get current pathname to highlight active navigation links
  const pathname = usePathname()

  // Get toggle function from shadcn sidebar context to collapse/expand sidebar
  const { toggleSidebar } = useSidebar()

  // Define navigation links for different user types (student/teacher)
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
  }

  // Show loader while user data is being fetched
  if (!isLoaded) return <Loader />
  
  // Show error message if user is not authenticated
  if (!user) return <h1 className='text-4xl text-center text-red-500'>User Not Found!</h1>

  // Get user type from Clerk public metadata, default to "student" if not set
  const userType = (user.publicMetadata.userType as "student" | "teacher") || "student"
  
  // Select appropriate navigation links based on user type
  const currentNavLinks = navLinks[userType]

  return (
    <Sidebar
      collapsible='icon' // Enables icon-only collapsed mode
      style={{ height: "100vh" }} // Full viewport height
      className='border-r border-border bg-card shadow-lg' // Shadcn theming: uses theme border and background colors
    >
      {/* HEADER: Logo and toggle button */}
      <SidebarHeader className='border-b border-border'> {/* Themed border bottom */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() => toggleSidebar()} // Toggle sidebar collapse/expand on click
              className='hover:bg-accent hover:text-accent-foreground transition-colors' // Shadcn accent colors on hover
              tooltip="Toggle Sidebar" // Shows tooltip in collapsed mode
            >
              {/* Container that handles logo positioning in both expanded and collapsed states */}
              <div className='flex items-center justify-between w-full gap-2'>
                {/* Logo - hidden in collapsed mode via group-data-[collapsible=icon] */}
                <div className='group-data-[collapsible=icon]:hidden'>
                  <Logo widthClass="w-32" heightClass="h-10" />
                </div>
                
                {/* Toggle icon - always visible, acts as logo replacement when collapsed */}
                <PanelLeft className='h-5 w-5 text-muted-foreground group-data-[collapsible=icon]:mx-auto' />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* CONTENT: Navigation links */}
      <SidebarContent className='px-2 py-4'> {/* Add padding for better spacing */}
        <SidebarMenu className="gap-1"> {/* Small gap between menu items */}
          {currentNavLinks.map((link) => {
            // Check if current route matches this link (for active state styling)
            const isActive = pathname.startsWith(link.href)
            
            return (
              <SidebarMenuItem
                key={link.href}
                className={cn(
                  "relative rounded-md transition-colors", // Smooth color transitions with rounded corners
                  // Center icon when collapsed
                  "group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center",
                  // Apply background to active item using shadcn theme colors
                  isActive && "bg-accent"
                )}
              >
                <SidebarMenuButton
                  asChild // Allows wrapping a Link component
                  size="lg"
                  tooltip={link.label} // Show label as tooltip when sidebar is collapsed
                  className={cn(
                    "gap-3 px-3 py-2.5 hover:bg-accent hover:text-accent-foreground transition-colors", // Shadcn hover states
                    // Center content when collapsed
                    "group-data-[collapsible=icon]:justify-center",
                    // Inactive link styling with muted text
                    !isActive && "text-muted-foreground"
                  )}
                >
                  <Link
                    href={link.href}
                    className="flex items-center w-full"
                    scroll={false} // Prevent scroll to top on navigation
                  >
                    {/* Icon with conditional theming based on active state */}
                    <link.icon
                      className={cn(
                        "h-5 w-5 shrink-0 transition-colors",
                        isActive ? "text-accent-foreground" : "text-muted-foreground"
                      )}
                    />
                    
                    {/* Label text - hidden when sidebar is collapsed */}
                    <span
                      className={cn(
                        "font-medium text-sm ml-3 group-data-[collapsible=icon]:hidden",
                        isActive ? "text-accent-foreground" : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
                
                {/* Active indicator bar on the right side - using theme primary color */}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-l-full bg-primary" />
                )}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* FOOTER: Sign out button */}
      <SidebarFooter className='border-t border-border p-2'> {/* Themed border top */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => signOut()} // Handle user logout
              tooltip="Sign out" // Show tooltip when collapsed
              className='hover:bg-destructive/10 hover:text-destructive transition-colors' // Destructive action styling
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span className="font-medium cursor-pointer text-sm ml-3 group-data-[collapsible=icon]:hidden">
                Sign out
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
