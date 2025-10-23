import type { Metadata } from "next";
import { DM_Sans} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "./providers";
import {ClerkProvider} from "@clerk/nextjs";

const dmSans = DM_Sans({
  subsets:["latin"],
  display:"swap",
  variable:"--font-dm-sans"
})

export const metadata: Metadata = {
  title: "LMS",
  description: "Learning management System - edtech",
  icons:{
    icon:"/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en" suppressHydrationWarning 
        >
        <body
          className={`${dmSans.className} `}
        >
        <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              
            >
              <Providers>
              {children}
              </Providers>
            </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
