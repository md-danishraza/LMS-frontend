'use client'

import { NotificationSettingsFormData, notificationSettingsSchema } from '@/lib/schemas'
import { useUpdateUserMutation } from '@/state/api'
import { useUser } from '@clerk/nextjs'
import React from 'react'

// Correct imports for react-hook-form
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Shadcn form components
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import HeaderProfile from './HeaderProfile'

// Type for user settings (add this to your types file)
interface UserSettings {
  courseNotifications?: boolean;
  emailAlerts?: boolean;
  smsAlerts?: boolean;
  notificationFrequency?: "immediate" | "daily" | "weekly";
}

function SharedNotificationSettings({
  title = "Notification Settings",
  subtitle = "Manage your notification settings"
}: { title?: string, subtitle?: string }) {

  const { user } = useUser()
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  
  // Current user settings with fallback to empty object
  const currentSettings = (user?.publicMetadata as { settings?: UserSettings })?.settings || {}

  // Define form with useForm hook from react-hook-form
  const form = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      courseNotifications: currentSettings.courseNotifications || false,
      emailAlerts: currentSettings.emailAlerts || false,
      smsAlerts: currentSettings.smsAlerts || false,
      notificationFrequency: currentSettings.notificationFrequency || "daily",
    },
  })

  const onSubmit = async (data: NotificationSettingsFormData) => {
    if (!user) return

    const updatedUser = {
      userId: user.id,
      publicMetadata: {
        // Preserve existing metadata (like userType)
        ...user.publicMetadata,
        // Update settings with new values
        settings: {
          ...currentSettings,
          ...data,
        },
      },
    }

    try {
      await updateUser(updatedUser).unwrap()
      // Optional: Show success toast
      console.log("Settings updated successfully!")
    } catch (error) {
      console.error("Failed to update user settings:", error)
      // Optional: Show error toast
    }
  }

  // Loading state while user data is being fetched
  if (!user) {
    return (
      <h1 className="text-4xl text-center text-destructive">
        Please Sign in to Access this page.
      </h1>
    )
  }

  return (
    <div className="notification-settings">
      <HeaderProfile title={title} subtitle={subtitle} />
      
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-2xl"
        >
          {/* Course Notifications Switch */}
          <FormField
            control={form.control}
            name="courseNotifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Course Notifications
                  </FormLabel>
                  <FormDescription>
                    Receive notifications about course updates and announcements
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Email Alerts Switch */}
          <FormField
            control={form.control}
            name="emailAlerts"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Email Alerts
                  </FormLabel>
                  <FormDescription>
                    Get important updates via email
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* SMS Alerts Switch */}
          <FormField
            control={form.control}
            name="smsAlerts"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    SMS Alerts
                  </FormLabel>
                  <FormDescription>
                    Receive critical notifications via SMS
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Notification Frequency Select */}
          <FormField
            control={form.control}
            name="notificationFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notification Frequency</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  How often would you like to receive notifications?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Updating..." : "Update Settings"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SharedNotificationSettings
