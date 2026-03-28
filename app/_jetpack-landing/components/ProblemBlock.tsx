"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import airplanImg from "../assets/airplane.png";
import hotAirBalloonImg from "../assets/balloon.png";

export const ProblemBlock = () => {
  const balloonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (balloonRef.current) {
        const speed = 0.15;
        balloonRef.current.style.transform = `translateY(${window.scrollY * -speed}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative mx-auto flex h-screen max-w-3xl flex-col items-center justify-center px-4 text-white">
      <Image
        alt=""
        className="pointer-events-none absolute top-12 right-[-180px] w-[260px] select-none opacity-80"
        src={airplanImg}
      />
      <div
        className="absolute bottom-12 left-[160px] will-change-transform"
        ref={balloonRef}
      >
        <Image
          alt=""
          className="pointer-events-none w-[200px] select-none opacity-80"
          src={hotAirBalloonImg}
        />
      </div>
      <div className="mb-8 text-center font-mono text-2xl">
        ⛔️ Stop wasting your time and tokens
      </div>
      <div className="mb-8 text-center font-bold text-4xl">
        The most suitable tools for building and growing your project
      </div>
      <div className="mb-10 text-center text-xl">
        Reliable development, deployment, and marketing tools — carefully
        selected and professionally configured, so you can focus strictly on
        what matters most.
      </div>
      {/* <div className="flex items-center gap-4 rounded-lg bg-white p-4">
        <Image
          alt="Next.js"
          className="mb-2"
          height={24}
          src={nextjsLogo}
          width={70}
        />
        <Image
          alt="Neon Postgres"
          className="mb-2"
          height={24}
          src={neonPostgresLogo}
          width={24}
        />
        <Image
          alt="Clerk"
          className="mb-2"
          height={24}
          src={clerkLogo}
          width={70}
        />
      </div> */}
      {/* <Tabs className="w-full" defaultValue="core-features">
        <TabsList className="w-full">
          <TabsTrigger className="text-lg" value="core-features">
            Core Features
          </TabsTrigger>
          <TabsTrigger className="text-lg" value="ai-powered-features">
            AI-tools
          </TabsTrigger>
          <TabsTrigger className="text-lg" value="tools">
            Tools
          </TabsTrigger>
        </TabsList>
        <TabsContent value="core-features">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <Badge className="mb-3">Framework</Badge>
              <div className="flex items-center gap-2">
                <Image
                  alt="Next.js"
                  className="mb-2"
                  height={24}
                  src={nextjsLogo}
                  width={24}
                />
                <h3 className="mb-2 font-semibold text-lg">
                  Next.js with TypeScript
                </h3>
              </div>
              <p className="mb-4 text-muted-foreground text-sm">
                The right choice for building modern web applications with the
                latest technologies and best practices.
              </p>
              <Button size="sm" variant="outline">
                <Link href="https://nextjs.org/learn" target="_blank">
                  Learn More
                </Link>
              </Button>
            </div>
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <Badge className="mb-3" variant="secondary">
                Database
              </Badge>
              <div className="flex items-center gap-2">
                <Image
                  alt="Neon Postgres"
                  className="mb-2"
                  height={24}
                  src={neonPostgresLogo}
                  width={24}
                />
                <h3 className="mb-2 font-semibold text-lg">Neon Postgres</h3>
              </div>
              <p className="mb-4 text-muted-foreground text-sm">
                Good choice for fast development and scaling with AI
              </p>
              <Button size="sm" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="ai-powered-features">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <Badge className="mb-3">Popular</Badge>
              <h3 className="mb-2 font-semibold text-lg">
                React Best Practices
              </h3>
              <p className="mb-4 text-muted-foreground text-sm">
                Discover the most popular patterns and practices used by React
                developers worldwide.
              </p>
              <Button size="sm" variant="outline">
                Learn More
              </Button>
            </div>
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <Badge className="mb-3">Popular</Badge>
              <h3 className="mb-2 font-semibold text-lg">
                API Design Principles
              </h3>
              <p className="mb-4 text-muted-foreground text-sm">
                Learn how to design clean, maintainable, and scalable APIs that
                developers love.
              </p>
              <Button size="sm" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="tools">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <Badge className="mb-3" variant="outline">
                New
              </Badge>
              <h3 className="mb-2 font-semibold text-lg">
                Next.js 15 Features
              </h3>
              <p className="mb-4 text-muted-foreground text-sm">
                Explore the latest features and improvements in Next.js 15 and
                how to use them.
              </p>
              <Button size="sm" variant="outline">
                Learn More
              </Button>
            </div>
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <Badge className="mb-3" variant="outline">
                New
              </Badge>
              <h3 className="mb-2 font-semibold text-lg">
                Tailwind CSS Updates
              </h3>
              <p className="mb-4 text-muted-foreground text-sm">
                Learn about the newest additions to Tailwind CSS and how they
                can improve your workflow.
              </p>
              <Button size="sm" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs> */}
    </div>
  );
};
