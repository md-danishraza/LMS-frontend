import * as z from "zod";

// users setting preference form
export const notificationSettingsSchema = z.object({
  courseNotifications: z.boolean(),
  emailAlerts: z.boolean(),
  smsAlerts: z.boolean(),
  notificationFrequency: z.enum(["immediate", "daily", "weekly"]),
});
// exporting it prop type
export type NotificationSettingsFormData = z.infer<
  typeof notificationSettingsSchema
>;
