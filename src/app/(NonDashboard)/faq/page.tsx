import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion';
  import { Button } from '@/components/ui/button';
  import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { Mail } from 'lucide-react';
  import Link from 'next/link';
  
  export default function FAQPage() {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-20">
        <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tighter sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mb-12 text-center text-lg text-muted-foreground">
          Have questions? We've got answers. If you can't find what you're
          looking for, feel free to contact us.
        </p>
  
        {/* --- Main Accordion --- */}
        <Accordion type="single" collapsible className="w-full">
          {/* --- General Section --- */}
          <h2 className="mt-10 mb-6 text-2xl font-bold tracking-tight">
            General
          </h2>
          <AccordionItem value="general-1">
            <AccordionTrigger className="text-left text-lg font-medium">
              What is ProLearn and how is it different?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              ProLearn is an online learning platform that combines the
              flexibility of on-demand video courses with the power of
              personalized, 1-on-1 mentorship. While other platforms just give
              you videos, we connect you directly with instructors for video
              sessions, project feedback, and career advice.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="general-2">
            <AccordionTrigger className="text-left text-lg font-medium">
              Why do I have to choose a "Student" or "Teacher" role?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              We require this choice during onboarding to personalize your
              experience. **Students** get a dashboard focused on learning and
              tracking progress. **Teachers** get a separate dashboard with tools
              to create, manage, and publish their courses.
            </AccordionContent>
          </AccordionItem>
  
          {/* --- Courses & Mentorship Section --- */}
          <h2 className="mt-10 mb-6 text-2xl font-bold tracking-tight">
            Courses & Mentorship
          </h2>
          <AccordionItem value="courses-1">
            <AccordionTrigger className="text-left text-lg font-medium">
              How does the 1-on-1 mentorship work?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              This is our core feature! When you're stuck on a concept,
              struggling with a project, or need career advice, you can book a
              live video session with your course instructor. This is done
              directly from your course dashboard (feature coming soon!).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="courses-2">
            <AccordionTrigger className="text-left text-lg font-medium">
              Do I get lifetime access to my courses?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Yes! All individual courses purchased on ProLearn come with
              lifetime access. You can learn at your own pace and revisit the
  _            material anytime.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="courses-3">
            <AccordionTrigger className="text-left text-lg font-medium">
              What if I'm not satisfied with a course?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              We offer a 14-day, no-questions-asked refund policy on all course
              purchases. If you're not happy with a course, you can request a
              full refund from your billing page.
            </AccordionContent>
          </AccordionItem>
  
          {/* --- Payments & Billing Section --- */}
          <h2 className="mt-10 mb-6 text-2xl font-bold tracking-tight">
            Payments & Billing
          </h2>
          <AccordionItem value="billing-1">
            <AccordionTrigger className="text-left text-lg font-medium">
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              We use Cashfree as our secure payment processor. This allows us to
              accept all major credit/debit cards, UPI, net banking, and other
              popular payment methods in your region.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="billing-2">
            <AccordionTrigger className="text-left text-lg font-medium">
              Is my payment information secure?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Absolutely. ProLearn does not store any of your credit card
              information. All payment data is handled and encrypted by Cashfree,
              our PCI-compliant payment partner.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="billing-3">
            <AccordionTrigger className="text-left text-lg font-medium">
              Where can I see my payment history?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              You can find a complete list of all your transactions and invoices
              on your **Billing** page, accessible from your user dashboard.
            </AccordionContent>
          </AccordionItem>
  
          {/* --- Account Section --- */}
          <h2 className="mt-10 mb-6 text-2xl font-bold tracking-tight">
            Account
          </h2>
          <AccordionItem value="account-1">
            <AccordionTrigger className="text-left text-lg font-medium">
              How do I update my profile or change my password?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              You can manage all your account details, including your name,
              profile picture, and password, from the **Settings** page in your
              dashboard.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
  
        {/* --- Contact CTA --- */}
        <Card className="mt-20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Still Have Questions?
            </CardTitle>
            <CardDescription>
              Our team is here to help. Get in touch with us.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Support
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }