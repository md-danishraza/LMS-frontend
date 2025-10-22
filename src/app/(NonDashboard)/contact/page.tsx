'use client'
import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Mail, MapPin } from "lucide-react";
import Link from "next/link";
function page() {
    return (
        <main className="container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
          <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
            Have a question, feedback, or need support? We're here to help. Reach
            out to us using the form below or through one of our other channels.
          </p>
    
          {/* --- Main Content Area (2-column grid) --- */}
          <div className="grid gap-12 rounded-lg border bg-card p-8 shadow-sm md:grid-cols-2 md:gap-16">
            
            {/* --- Column 1: Contact Form --- */}
            <div className="flex flex-col">
              <h2 className="mb-6 text-3xl font-bold tracking-tight">
                Send Us a Message
              </h2>
              {/* Note: This is a static form. 
                  To make it work, you'd wrap it in a client component 
                  with react-hook-form and zod. */}
              <form className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
    
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
    
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a reason..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mentorship">Mentorship Question</SelectItem>
                      <SelectItem value="course">Course Inquiry</SelectItem>
                      <SelectItem value="billing">Billing & Payments</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="general">General Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
    
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Hi, I'd like to ask about..."
                    rows={5}
                  />
                </div>
    
                <Button type="submit" size="lg" className="mt-4 w-full">
                  Send Message
                </Button>
              </form>
            </div>
    
            {/* --- Column 2: Contact Info --- */}
            <div className="flex flex-col">
              <h2 className="mb-6 text-3xl font-bold tracking-tight">
                Contact Information
              </h2>
              <p className="mb-8 text-muted-foreground">
                You can also reach us through these channels. We'll get back to you
                as soon as possible.
              </p>
    
              <div className="flex flex-col gap-8">
                {/* Email */}
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
    
                {/* Help Center */}
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
    
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-md bg-primary/10 p-3 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Our Office</h3>
                    <p className="text-muted-foreground">
                      Random Adress
                      <br />
                      Faridabad,HR
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

export default page
