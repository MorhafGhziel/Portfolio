import Hero from "@/components/Hero";
import About from "@/components/About";
import FloatingElements from "@/components/ui/FloatingElements";
import ParticleBackground from "@/components/ui/ParticleBackground";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <FloatingElements />
      <Hero />
      <About />
    </>
  );
}
