import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
      <h1 className="font-primary mb-16 text-center text-4xl font-bold tracking-tighter sm:text-5xl">
        About ProLearn
      </h1>

      {/* --- HERO SECTION --- */}
      <section>
        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
          Don't Just Watch. Start Achieving.
        </h2>
        <p className="mb-4 text-lg text-muted-foreground">
          Online learning has a problem. We have access to more information than
          ever before—thousands of high-quality video courses on every
          imaginable subject. But information is only half the battle.
        </p>
        <p className="mb-4 text-lg text-muted-foreground">
          What happens when you get stuck on a real-world problem? When the
          video doesn't cover your unique use case? You're left to figure it out
          alone.
        </p>
        <p className="mb-4 text-lg text-muted-foreground">
          That's why we built <strong>ProLearn</strong>.
        </p>
        <p className="mt-6 text-xl font-medium text-primary font-secondary">
          ProLearn is the first-of-its-kind platform that combines the
          flexibility of on-demand courses with the power of personal, 1-on-1
          mentorship.
        </p>
      </section>

      {/* --- MISSION SECTION --- */}
      <section className="mt-16">
        <h2 className="mb-6 text-3xl font-bold tracking-tight">Our Mission</h2>
        <p className="text-lg text-muted-foreground">
          Our mission is to close the gap between <em>knowing</em> something and{" "}
          <em>mastering</em> it. We believe real learning isn't a one-way
          lecture; it's a conversation. We empower you to learn new skills with
          the confidence that an expert is right there to guide you when you
          need it most.
        </p>
      </section>

      {/* --- DIFFERENCE SECTION (2-COLUMN) --- */}
      <section className="mt-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">
          The ProLearn Difference
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          We built our platform on two core pillars.
        </p>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Pillar 1: Courses */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-2xl font-semibold">
              1. A World-Class Course Library
            </h3>
            <p className="text-muted-foreground">
              Just like the platforms you already love, you get lifetime access
              to a massive library of courses taught by industry professionals.
              Learn at your own pace, on your own schedule, from anywhere in the
              world.
            </p>
          </div>

          {/* Pillar 2: Mentorship (The Key Feature) */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-2xl font-semibold">
              2. Direct 1-on-1 Mentorship
            </h3>
            <p className="mb-6 text-muted-foreground">
              This is what makes us different. Every course you take is just
              the beginning.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-md">
                  <strong>Got Stuck?</strong> Book a video session with your
                  instructor.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-md">
                  <strong>Need Feedback?</strong> Get your code, design, or
                  project reviewed.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-md">
                  <strong>Want Career Advice?</strong> Talk directly to a
                  professional.
                </span>
              </div>
            </div>
            <p className="mt-6 text-muted-foreground">
              No more waiting days for a forum reply. No more learning in
              isolation.
            </p>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION SECTION --- */}
      <section className="mt-20 text-center">
        <h2 className="mb-6 text-3xl font-bold tracking-tight">
          Start Your Journey Today
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Stop feeling stuck. Find a course, connect with your mentor, and
          accelerate your learning with ProLearn.
        </p>
        <Button size="lg" asChild>
          <Link href="/search">Browse All Courses</Link>
        </Button>
      </section>
    </main>
  );
}