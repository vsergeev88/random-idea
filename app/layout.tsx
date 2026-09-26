import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import "./globals.css";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "random-idea — генератор идей для стартапа",
  description:
    "Придумай идею стартапа за 5 минут из продуманных смысловых блоков. Бесплатно, без регистрации.",
};

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
      <body className={"flex min-h-screen flex-col antialiased"}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
