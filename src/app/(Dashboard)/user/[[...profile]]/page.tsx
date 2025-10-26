import HeaderProfile from '@/components/HeaderProfile'
import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function page() {
  return (
    <>
      <HeaderProfile title='Profile' subtitle='View your profile'/>
      {/* Container with proper responsive constraints */}
      <div className="flex justify-center py-8 px-4 w-full">
        {/* Wrapper to constrain UserProfile width and make it responsive */}
        <div className="w-full max-w-5xl">
          <UserProfile
            path='/user/profile'
            routing='path'
            appearance={{
              elements: {
                // Root container - constrain width and make responsive
                rootBox: 'w-full max-w-full', // Prevents overflow on mobile
                
                // Card container - responsive width
                card: 'w-full bg-card text-card-foreground border border-border shadow-sm rounded-lg overflow-hidden',
                
                // Header
                headerTitle: 'text-xl md:text-2xl font-semibold text-foreground',
                headerSubtitle: 'text-xs md:text-sm text-muted-foreground',
                
                // Navbar (tabs on the side) - make responsive
                navbar: 'bg-muted/50 border-r border-border overflow-y-auto',
                navbarButton: 
                  'text-xs md:text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors px-2 md:px-3',
                navbarButtonActive: 
                  'bg-accent text-accent-foreground font-medium',
                
                // Main content area - prevent overflow
                pageScrollBox: 'bg-card overflow-y-auto overflow-x-hidden',
                page: 'bg-card p-4 md:p-6',
                
                // Form elements - responsive sizing
                formFieldLabel: 'text-xs md:text-sm font-medium text-foreground',
                formFieldInput: 
                  'flex h-9 md:h-10 w-full rounded-md border border-input bg-background px-2 md:px-3 py-2 text-xs md:text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-xs md:file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                formFieldInputShowPasswordButton: 
                  'text-muted-foreground hover:text-foreground',
                
                // Buttons - responsive sizing
                formButtonPrimary: 
                  'inline-flex items-center justify-center rounded-md text-xs md:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 md:h-10 px-3 md:px-4 py-2',
                formButtonReset: 
                  'inline-flex items-center justify-center rounded-md text-xs md:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 md:h-10 px-3 md:px-4 py-2',
                
                // Avatar uploader - responsive sizing
                avatarBox: 'w-20 h-20 md:w-24 md:h-24',
                avatarImageActionsUpload: 
                  'text-xs md:text-sm text-primary hover:text-primary/90',
                avatarImageActionsRemove: 
                  'text-xs md:text-sm text-destructive hover:text-destructive/90',
                
                // Profile section - responsive spacing
                profileSection: 'border-b border-border pb-4 md:pb-6 mb-4 md:mb-6',
                profileSectionTitle: 'text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4',
                profileSectionContent: 'space-y-3 md:space-y-4',
                
                // Badge (for verified email, etc.) - responsive sizing
                badge: 'inline-flex items-center rounded-full border px-2 md:px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground',
                
                // Footer
                footer: 'hidden', // Hide Clerk branding
                
                // Account page specific - responsive
                accordionTriggerButton: 
                  'flex flex-1 items-center justify-between py-3 md:py-4 text-sm md:text-base font-medium text-foreground transition-all hover:underline',
                accordionContent: 
                  'overflow-hidden text-xs md:text-sm text-muted-foreground transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
                
                // Delete account section
                profileSectionPrimaryButton__deleteAccount: 
                  'bg-destructive text-destructive-foreground hover:bg-destructive/90',
              },
              variables: {
                colorPrimary: 'hsl(var(--primary))',
                colorBackground: 'hsl(var(--background))',
                colorText: 'hsl(var(--foreground))',
                colorTextSecondary: 'hsl(var(--muted-foreground))',
                colorDanger: 'hsl(var(--destructive))',
                colorSuccess: 'hsl(var(--primary))',
                colorInputBackground: 'hsl(var(--background))',
                colorInputText: 'hsl(var(--foreground))',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-sans)',
              },
              layout: {
                // Make the layout responsive to container width
                shimmer: true,
              },
            }}
          />
        </div>
      </div>
    </>
  )
}

export default page
