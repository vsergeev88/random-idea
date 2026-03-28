import { ClerkProvider } from "@clerk/nextjs";
import { ui } from "@clerk/ui";
import "./globals.css";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { templateMetadata } from "./_template/content/metadata";
import { clerkAppearanceObject } from "./clerkAppearanceObject";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = templateMetadata;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={cn(
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        raleway.variable
      )}
      lang="en"
    >
      <ClerkProvider appearance={clerkAppearanceObject} ui={ui}>
        <body className={"flex min-h-screen flex-col antialiased"}>
          <TooltipProvider>{children}</TooltipProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
