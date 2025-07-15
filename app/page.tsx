import Hero from "@/components/Hero";
import About from "@/components/About";
import FloatingElements from "@/components/ui/FloatingElements";
import ParticleBackground from "@/components/ui/ParticleBackground";
import Projects from "@/components/Projects";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <FloatingElements />
      <Hero />
      <About />
      <Projects />
      <ContactCTA />
    </>
  );
}
