import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ColourfulText from "../ColorfulText";
import { Clouds } from "./Clouds";
import { Skyline } from "./Skyline";
// import { ScrollVelocity } from "./ScrollVelocity/ScrollVelocity";

export const HeroBlock = () => {
  // const features = [
  //   "Fullstack Framework  Battle-tested Auth  Classic & Crypto Payments  Flexible Styling  Database Integrations  Unique AI Agent Skills  > 65 features more",
  // ];
  const features = [
    "Next.js",
    "Authentication",
    "Database",
    "Banking & Crypto Payments",
    "Shadcn components",
    "AI skills and configurations",
    // "Mailing tools",
    "Indie hacker guides & tools",
    "+ tons of features more",
  ];

  return (
    <div className="relative h-screen overflow-hidden">
      <Clouds />

      <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center">
        <div className="text-center font-bold text-[15vw] text-white">
          JETPACK
        </div>
        <div className="w-prose text-center font-bold text-5xl text-white">
          All-in-one AI-adapted template <br /> for your{" "}
          <ColourfulText
            colors={[
              // "rgb(255, 50, 130)",
              // "rgb(255, 165, 0)",
              // "rgb(255, 210, 10)",
              // "rgb(150, 45, 255)",
              // "rgb(255, 85, 85)",
              "rgb(230, 25, 140)",
              // "rgb(255, 105, 50)",
              // "rgb(210, 55, 240)",
            ]}
            text="startup"
          />{" "}
          to ship faster
        </div>
        <div className="my-10 flex gap-4">
          <Button
            className="px-10 py-6 font-semibold text-xl"
            size="lg"
            variant="outline"
          >
            Join waitlist
          </Button>
          <div className="relative">
            <Button
              className="relative px-10 py-6 font-semibold text-xl"
              disabled
              size="lg"
            >
              Get Early Access
            </Button>
            <Badge
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rotate-[22deg] bg-white"
              variant="default"
            >
              SOON
            </Badge>
          </div>
        </div>
        <div className="columns-1 md:columns-3">
          {features.map((feature) => (
            <div
              className="mb-1 flex items-center gap-1 text-white"
              key={feature}
            >
              ✅ {feature}
            </div>
          ))}
        </div>
      </div>

      <Skyline />
    </div>
  );
};
