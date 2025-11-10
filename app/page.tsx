import Hero from "@/components/Hero";
import { PROJECTS } from "@/constants";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero projectsCount={PROJECTS.length} />
      <About />
      <Projects />
      <ContactCTA />
    </>
  );
}
