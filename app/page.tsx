import Hero from "@/components/Hero";
import { FloatingElements } from "@/components/FloatingElements";
import { ParticleBackground } from "@/components/ParticleBackground";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <FloatingElements />
      <Hero />
    </>
  );
}
