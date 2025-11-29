import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
      <div className="mb-8">
        <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tighter sm:text-5xl">
        Terms of Service
      </h1>
      <p className="mb-12 text-center text-muted-foreground">
        Last Updated: November 29, 2025
      </p>

      {/* --- 1. ACCEPTANCE --- */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground">
          By accessing or using the ProLearn platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
        </p>
      </section>

      {/* --- 2. ACCOUNTS --- */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">2. User Accounts</h2>
        <p className="text-muted-foreground">
          To access certain features of the Service, you must register for an account using Clerk authentication. You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li><strong>Students:</strong> Accounts designated for consuming content and booking mentorship.</li>
          <li><strong>Teachers:</strong> Accounts designated for creating courses and conducting mentorship. Teachers are vetted and must adhere to our instructor guidelines.</li>
        </ul>
      </section>

      {/* --- 3. COURSES & CONTENT --- */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">3. Courses and Content</h2>
        <p className="text-muted-foreground">
          <strong>License:</strong> When you purchase a course, ProLearn grants you a limited, non-exclusive, non-transferable license to access and view the course content for personal, non-commercial purposes.
        </p>
        <p className="text-muted-foreground">
          <strong>Ownership:</strong> Instructors retain ownership of the content they create. ProLearn holds the rights to the platform design, code, and aggregated data.
        </p>
      </section>

      {/* --- 4. MENTORSHIP SESSIONS --- */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">4. Mentorship Sessions</h2>
        <p className="text-muted-foreground">
          ProLearn facilitates 1-on-1 video sessions between Students and Teachers via Agora.
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li><strong>Conduct:</strong> All users must maintain professional conduct during sessions. Harassment, hate speech, or inappropriate behavior will result in immediate account termination.</li>
          <li><strong>Recording:</strong> Sessions are not recorded by ProLearn by default. Users may not record sessions without the explicit consent of the other party.</li>
          <li><strong>Scheduling:</strong> Sessions must be booked in advance. Cancellations made less than 24 hours before the start time may not be eligible for a refund.</li>
        </ul>
      </section>

      {/* --- 5. PAYMENTS --- */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">5. Payments and Refunds</h2>
        <p className="text-muted-foreground">
          <strong>Processing:</strong> Payments are processed securely via Cashfree. We do not store your full credit card information on our servers.
        </p>
        <p className="text-muted-foreground">
          <strong>Refunds:</strong> You may request a refund for a course within 14 days of purchase, provided you have not completed more than 30% of the course content. Mentorship sessions are refundable only if cancelled 24 hours prior to the scheduled time or if the instructor fails to attend.
        </p>
      </section>

      {/* --- 6. PROHIBITED USES --- */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">6. Prohibited Uses</h2>
        <p className="text-muted-foreground">
          You agree not to use the Service:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>In any way that violates any applicable national or international law.</li>
          <li>To share account credentials with others ("account sharing").</li>
          <li>To download, rip, or redistribute course videos illegally.</li>
          <li>To transmit any advertising or promotional material (spam).</li>
        </ul>
      </section>

      {/* --- 7. TERMINATION --- */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">7. Termination</h2>
        <p className="text-muted-foreground">
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
      </section>

      {/* --- 8. CHANGES --- */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">8. Changes to Terms</h2>
        <p className="text-muted-foreground">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
        </p>
      </section>

      {/* --- CONTACT --- */}
      <section className="border-t pt-8">
        <h2 className="text-xl font-bold tracking-tight mb-4">Contact Us</h2>
        <p className="text-muted-foreground">
          If you have any questions about these Terms, please contact us at{" "}
          <a href="mailto:legal@prolearn.com" className="text-primary hover:underline">
            legal@prolearn.com
          </a>
        </p>
      </section>
    </main>
  );
}