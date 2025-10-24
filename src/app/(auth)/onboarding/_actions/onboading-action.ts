"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

type Role = "student" | "teacher";

export async function updateUserRole(userType: Role) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "User not authenticated" };
  }

  try {
    const client = await clerkClient();

    await client.users.updateUser(userId, {
      publicMetadata: {
        userType,
      },
    });

    return { success: true };
  } catch (err) {
    console.error("Failed to update user role:", err);
    return { success: false, error: "An error occurred on the server." };
  }
}
