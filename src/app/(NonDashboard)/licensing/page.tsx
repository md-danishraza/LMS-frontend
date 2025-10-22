import React from 'react'
import Link from 'next/link';
function page() {

  const libraries = [
    {
      name: "Next.js",
      href: "https://github.com/vercel/next.js/blob/canary/LICENSE",
      license: "MIT License",
    },
    {
      name: "React",
      href: "https://github.com/facebook/react/blob/main/LICENSE",
      license: "MIT License",
    },
    {
      name: "Node.js",
      href: "https://github.com/nodejs/node/blob/main/LICENSE",
      license: "MIT License",
    },
    {
      name: "Tailwind CSS",
      href: "https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE",
      license: "MIT License",
    },
    {
      name: "shadcn/ui",
      href: "https://github.com/shadcn-ui/ui/blob/main/LICENSE.md",
      license: "MIT License",
    },
    {
      name: "Lucide Icons",
      href: "https://github.com/lucide-icons/lucide/blob/main/LICENSE",
      license: "ISC License",
    },
    {
      name: "Dynamoose",
      href: "https://github.com/dynamoose/dynamoose/blob/main/LICENSE",
      license: "MIT License",
    },
    {
      name: "AWS SDK for JavaScript",
      href: "https://github.com/aws/aws-sdk-js-v3/blob/main/LICENSE.txt",
      license: "Apache-2.0 License",
    },
    {
      name: "next-themes",
      href: "https://github.com/pacocoursey/next-themes/blob/main/LICENSE",
      license: "MIT License",
    },
  ];

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
      <h1 className="mb-12 text-center text-4xl font-bold font-primary tracking-tighter sm:text-5xl">
        License & Acknowledgements
      </h1>

      {/* --- OUR LICENSE --- */}
      <section className="mb-10">
        <h2 className="mb-6 text-3xl font-bold tracking-tight">
          ProLearn Software License
        </h2>
        <p className="text-lg text-muted-foreground">
          ProLearn© 2025. All Rights Reserved.
        </p>
        <p className="mt-4 text-muted-foreground">
          The ProLearn application, including its source code, design, logos,
          and all related assets, is the exclusive proprietary property of
          ProLearn and its licensors. This software is protected by copyright
          and international intellectual property laws.
        </p>
        <p className="mt-4 text-muted-foreground">
          You are granted a limited, non-transferable, revocable license to
          access and use the ProLearn service strictly in accordance with our{" "}
          <Link href="/terms-of-service" className="text-primary hover:underline">
            Terms of Service
          </Link>
          .
        </p>
      </section>

      {/* --- CONTENT LICENSE --- */}
      <section className="mb-10">
        <h2 className="mb-6 text-3xl font-bold tracking-tight">
          Content & Mentorship License
        </h2>
        <p className="text-muted-foreground">
          Your use of content on the ProLearn platform (both content you consume
          and content you may create) is governed by our{" "}
          <Link href="/terms-of-service" className="text-primary hover:underline">
            Terms of Service
          </Link>
          . This includes the license granted to you for viewing course
          materials and the terms for interacting with mentors.
        </p>
      </section>

      {/* --- OPEN SOURCE ACKNOWLEDGEMENTS --- */}
      <section className="mb-10">
        <h2 className="mb-6 text-3xl font-bold tracking-tight">
          Open Source Acknowledgements
        </h2>
        <p className="mb-8 text-muted-foreground">
          ProLearn is built using many incredible open-source projects. We are
          deeply grateful to the developers and communities who dedicate their
          time to building and maintaining this software. We are pleased to
          provide a list of some of the key libraries that help power our
          platform.
        </p>

        <div className="rounded-lg border bg-card/50 p-6">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {libraries.map((lib) => (
              <li key={lib.name} className="text-muted-foreground">
                <strong>{lib.name}</strong> -{" "}
                <a
                  href={lib.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {lib.license}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          This list is not exhaustive. All open-source software used is subject
          to its respective license, and all such licenses are hereby
          incorporated by reference.
        </p>
      </section>
    </main>
  );
}

export default page
