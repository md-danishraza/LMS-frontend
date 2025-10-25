import HeaderProfile from '@/components/HeaderProfile'
import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function page() {
  return (
    <>
      <HeaderProfile title='Profile' subtitle='View your profile'/>
      <div className="flex overflow-scroll  py-8 px-4">
        <UserProfile
          path='/user/profile'
          routing='path'
          appearance={{
            elements: {
              // Root container - make it more compact
              rootBox: 'w-full ',
              
              // Card container
              card: 'bg-card text-card-foreground border border-border shadow-sm rounded-lg',
              
              // Header
              headerTitle: 'text-2xl font-semibold text-foreground',
              headerSubtitle: 'text-sm text-muted-foreground',
              
              // Navbar (tabs on the side)
              navbar: 'bg-muted/50 border-r border-border',
              navbarButton: 
                'text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors',
              navbarButtonActive: 
                'bg-accent text-accent-foreground font-medium',
              
              // Main content area
              pageScrollBox: 'bg-card',
              page: 'bg-card',
              
              // Form elements
              formFieldLabel: 'text-sm font-medium text-foreground',
              formFieldInput: 
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              formFieldInputShowPasswordButton: 
                'text-muted-foreground hover:text-foreground',
              
              // Buttons
              formButtonPrimary: 
                'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
              formButtonReset: 
                'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2',
              
              // Avatar uploader
              avatarBox: 'w-24 h-24',
              avatarImageActionsUpload: 
                'text-sm text-primary hover:text-primary/90',
              avatarImageActionsRemove: 
                'text-sm text-destructive hover:text-destructive/90',
              
              // Profile section
              profileSection: 'border-b border-border pb-6 mb-6',
              profileSectionTitle: 'text-lg font-semibold text-foreground mb-4',
              profileSectionContent: 'space-y-4',
              
              // Badge (for verified email, etc.)
              badge: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground',
              
              // Footer
              footer: 'hidden', // Hide Clerk branding
              
              // Account page specific
              accordionTriggerButton: 
                'flex flex-1 items-center justify-between py-4 font-medium text-foreground transition-all hover:underline',
              accordionContent: 
                'overflow-hidden text-sm text-muted-foreground transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
              
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
          }}
        />
      </div>
    </>
  )
}

export default page
