import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();

  // teacher or student default set to student
  const userRole =
    (sessionClaims?.metadata as { userType: "student" | "teacher" })
      ?.userType || "student";

  if (isStudentRoute(req)) {
    // user is teacher
    if (userRole == "teacher") {
      const url = new URL("/teacher/courses", req.url);
      return NextResponse.redirect(url);
    }
  }
  if (isTeacherRoute(req)) {
    // user is student
    if (userRole == "student") {
      const url = new URL("/user/courses", req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
