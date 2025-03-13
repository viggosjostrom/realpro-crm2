import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry";
import "./globals.css";
import Script from "next/script";
import HydrationErrorBoundary from "@/components/HydrationErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RealPro CRM | Modern Real Estate Management",
  description: "A modern, user-friendly CRM system for real estate agents in the Swedish market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add a script to suppress React hydration errors */}
        <Script id="suppress-hydration-warnings" strategy="beforeInteractive">
          {`
            // Suppress React hydration errors
            const originalConsoleError = console.error;
            console.error = function(...args) {
              // Check if the error is a hydration error
              if (args[0]?.includes && 
                  (args[0].includes('Warning: Text content did not match') ||
                   args[0].includes('Warning: Expected server HTML to contain') ||
                   args[0].includes('Hydration failed because'))) {
                // Ignore the error
                return;
              }
              // Pass through other errors
              originalConsoleError.apply(console, args);
            };
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <HydrationErrorBoundary>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </HydrationErrorBoundary>
      </body>
    </html>
  );
}
