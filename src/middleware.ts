import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding"]);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims, userId } = await auth();

  const userRole = sessionClaims?.userType as "student" | "teacher" | undefined;

  console.log("User ID:", userId);
  console.log("User Role:", userRole);

  // Redirect users without a role to onboarding
  if (userId && !userRole && !isOnboardingRoute(req)) {
    const url = new URL("/onboarding", req.url);
    return NextResponse.redirect(url);
  }

  // Handle users with roles
  if (userId && userRole) {
    // Redirect away from onboarding if they already have a role
    if (isOnboardingRoute(req)) {
      const url = new URL(
        userRole === "teacher" ? "/teacher/courses" : "/user/courses",
        req.url
      );
      return NextResponse.redirect(url);
    }

    // Role-based route protection
    if (isStudentRoute(req) && userRole === "teacher") {
      const url = new URL("/teacher/courses", req.url);
      return NextResponse.redirect(url);
    }

    if (isTeacherRoute(req) && userRole === "student") {
      const url = new URL("/user/courses", req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
