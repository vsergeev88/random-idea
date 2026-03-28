import { CallToActionBlock } from "./components/CallToActionBlock";
import { FAQBlock } from "./components/FAQBlock";
import { HeroBlock } from "./components/HeroBlock/HeroBlock";
import Layout from "./components/layout/Layout";
import { ProblemBlock } from "./components/ProblemBlock";
import { SolvedBlock } from "./components/SolvedBlock";

export const JetpackLanding = () => {
  return (
    <Layout>
      <FAQBlock />
      <CallToActionBlock />
      <SolvedBlock />
      <ProblemBlock />
      <HeroBlock />
    </Layout>
  );
};
