"use client";

import React from "react";
import { HelpCircle, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContactPageForm from "@/components/ContactPageForm";

export default function ContactPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tighter sm:text-5xl">
        Get in Touch
      </h1>
      <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
        Have a question, feedback, or need support? We're here to help. Reach out
        to us using the form below or through one of our other channels.
      </p>

      {/* --- Main Content Area (2-column grid) --- */}
      <div className="grid gap-12 rounded-lg border bg-card p-8 shadow-sm md:grid-cols-2 md:gap-16">
        
        {/* --- Column 1: Contact Form --- */}
        <div className="flex flex-col">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            Send Us a Message
          </h2>
          {/* Using the separated form component */}
          <ContactPageForm />
        </div>

        {/* --- Column 2: Contact Info (Static) --- */}
        <div className="flex flex-col">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            Contact Information
          </h2>
          <p className="mb-8 text-muted-foreground">
            You can also reach us through these channels. We'll get back to you
            as soon as possible.
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-md bg-primary/10 p-3 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Email Us</h3>
                <p className="text-muted-foreground">
                  For general support and inquiries.
                </p>
                <a
                  href="mailto:support@prolearn.com"
                  className="mt-1 block text-primary hover:underline"
                >
                  support@prolearn.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-md bg-primary/10 p-3 text-primary">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Help Center & FAQs</h3>
                <p className="text-muted-foreground">
                  Find instant answers to common questions.
                </p>
                <Button variant="outline" className="mt-2" asChild>
                  <Link href="/faq">Visit Help Center</Link>
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-md bg-primary/10 p-3 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Our Office</h3>
                <p className="text-muted-foreground">
                  123 Learning Lane
                  <br />
                  Faridabad, HR
                  <br />
                  India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}