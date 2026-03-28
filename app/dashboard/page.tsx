import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ClerkLogo } from "../_template/components/clerk-logo";
import { DeployButton } from "../_template/components/deploy-button";
import { Footer } from "../_template/components/footer";
import { LearnMore } from "../_template/components/learn-more";
import { NextLogo } from "../_template/components/next-logo";
import { DASHBOARD_CARDS } from "../_template/content/cards";
import { CodeSwitcher } from "../components/code-switcher";
import { NotesCrud } from "../components/notes-crud";
import { UserDetails } from "../components/user-details";

export default async function DashboardPage() {
  await auth.protect();

  return (
    <>
      <main className="mx-auto w-full max-w-300">
        <div className="grid grid-cols-[1fr_20.5rem] gap-10 pb-10">
          <div>
            <header className="flex h-16 w-full items-center justify-between gap-4">
              <div className="flex gap-4">
                <div className="inline-flex gap-4 rounded-full bg-[#F4F4F5] px-4 py-3">
                  <ClerkLogo />
                  <div aria-hidden className="h-6 w-px bg-[#C7C7C8]" />
                  <NextLogo />
                </div>
                <Link
                  className="flex items-center gap-2 rounded-full px-3 py-2 font-medium text-[0.8125rem] hover:bg-gray-100"
                  href="/"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M15 19l-7-7 7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  Back to Home
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "size-8",
                    },
                  }}
                />
              </div>
            </header>
            <UserDetails />
            <NotesCrud />
          </div>
          <div className="flex flex-col">
            <div className="flex h-16 w-full items-center justify-center">
              <DeployButton className="h-8" />
            </div>
            <CodeSwitcher />
          </div>
        </div>
      </main>
      <LearnMore cards={DASHBOARD_CARDS} />
      <Footer />
    </>
  );
}
