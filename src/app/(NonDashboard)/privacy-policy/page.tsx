import React from 'react'

function page() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
    <h1 className="mb-4 font-primary text-center text-4xl font-bold tracking-tighter sm:text-5xl">
      Privacy Policy
    </h1>
    <p className="mb-12 text-center text-muted-foreground">
      Last Updated: October 22, 2025
    </p>

    {/* --- INTRODUCTION --- */}
    <section className="mb-10">
      <p className="mb-4 text-lg text-muted-foreground">
        Welcome to ProLearn ("we," "our," or "us"). We are committed to
        protecting your privacy. This Privacy Policy explains how we collect,
        use, disclose, and safeguard your information when you visit our
        website and use our services (the "Services"), including our on-demand
        courses and 1-on-1 mentorship features.
      </p>
      <p className="text-lg text-muted-foreground">
        Please read this privacy policy carefully. If you do not agree with
        the terms of this privacy policy, please do not access the site.
      </p>
    </section>

    {/* --- INFORMATION WE COLLECT --- */}
    <section className="mb-10">
      <h2 className="mb-6 text-3xl font-bold tracking-tight">
        Information We Collect
      </h2>
      <p className="mb-6 text-muted-foreground">
        We may collect information about you in a variety of ways. The
        information we may collect on the Site includes:
      </p>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="mb-2 text-xl font-semibold">
            Personal Information
          </h3>
          <p className="text-muted-foreground">
            Personally identifiable information, such as your name, email
            address, and payment information, that you voluntarily give to us
            when you register for an account or purchase a course.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">
            Course and Mentorship Data
          </h3>
          <p className="text-muted-foreground">
            Information related to your progress in courses, course reviews,
            and communications with mentors (including messages and video
            session metadata).
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">Financial Data</h3>
          <p className="text-muted-foreground">
            We do not store or collect full payment card details. All financial
            information is stored and processed by our payment processor
            (e.g., Razorpay).
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">
            Derivative and Usage Data
          </h3>
          <p className="text-muted-foreground">
            Information our servers automatically collect when you access the
            Site, such as your IP address, browser type, operating system,
            access times, and the pages you have viewed.
          </p>
        </div>
      </div>
    </section>

    {/* --- HOW WE USE YOUR INFORMATION --- */}
    <section className="mb-10">
      <h2 className="mb-6 text-3xl font-bold tracking-tight">
        How We Use Your Information
      </h2>
      <p className="mb-6 text-muted-foreground">
        Having accurate information about you permits us to provide you with a
        smooth, efficient, and customized experience. Specifically, we may use
        information collected about you to:
      </p>
      <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
        <li>Create and manage your account.</li>
        <li>
          Process your payments and provide you with access to courses.
        </li>
        <li>
          Facilitate 1-on-1 mentorship sessions between you and instructors.
        </li>
        <li>
          Email you regarding your account, purchases, or new services.
        </li>
        <li>Monitor and analyze usage and trends to improve the Services.</li>
        <li>Resolve disputes and troubleshoot problems.</li>
      </ul>
    </section>

    {/* --- HOW WE SHARE YOUR INFORMATION --- */}
    <section className="mb-10">
      <h2 className="mb-6 text-3xl font-bold tracking-tight">
        How We Share Your Information
      </h2>
      <p className="mb-6 text-muted-foreground">
        We do not sell your information. We may share information we have
        collected about you in certain situations:
      </p>
      <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
        <li>
          <strong>With Mentors/Instructors:</strong> We will share your name
          and course progress with mentors to facilitate 1-on-1 sessions.
        </li>
        <li>
          <strong>Third-Party Service Providers:</strong> We may share your
          information with third parties that perform services for us,
          including payment processing, video conferencing (e.g., Agora), data
          analysis, and email delivery.
        </li>
        <li>
          <strong>By Law or to Protect Rights:</strong> We may share your
          information if we believe the release of information is necessary to
          respond to legal process or to protect the rights, property, and
          safety of others.
        </li>
      </ul>
    </section>

    {/* --- OTHER SECTIONS --- */}
    <section className="mb-10 space-y-8">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight">
          Data Security
        </h2>
        <p className="text-muted-foreground">
          We use administrative, technical, and physical security measures to
          help protect your personal information. While we have taken
          reasonable steps to secure the personal information you provide to
          us, please be aware that no security measures are perfect or
          impenetrable.
        </p>
      </div>
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight">Your Rights</h2>
        <p className="text-muted-foreground">
          Depending on your location, you may have
          certain rights regarding your personal data, including the right to
          access, correct, or delete your information. You can manage your
CSS
          account information from your user settings page or by contacting us.
        </p>
      </div>
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight">
          Changes to This Policy
        </h2>
        <p className="text-muted-foreground">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page
          and updating the "Last Updated" date.
        </p>
      </div>
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight">Contact Us</h2>
        <p className="text-muted-foreground">
          If you have questions or comments about this Privacy Policy, please
          contact us at:
          <br />
          <a
            href="mailto:privacy@prolearn.com"
            className="text-primary hover:underline"
          >
            privacy@prolearn.com
          </a>
        </p>
      </div>
    </section>
  </main>
  )
}

export default page
