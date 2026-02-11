import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Problem } from "@/components/landing/problem";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SocialProof } from "@/components/landing/social-proof";
import { FoundersManifesto } from "@/components/landing/founders-manifesto";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans text-deep-brown selection:bg-coral/20">
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        {/* <SocialProof /> */}
        <FoundersManifesto />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
