import { PROJECTS } from "@/constants";
import Hero from "@/components/Hero";
import StackMarquee from "@/components/StackMarquee";
import Work from "@/components/Work";
import FilmStrip from "@/components/FilmStrip";
import About from "@/components/About";
import Contact from "@/components/Contact";

const YEARS_SHIPPING = 5;

/** A reel of real screens, used purely as texture between sections. */
const REEL = [
  "/images/Arch/Archy-3.png",
  "/images/itar/itar-1.png",
  "/images/lumen/1.png",
  "/images/cvai.png",
  "/images/omdah/1.png",
  "/images/snaya.png",
  "/images/AlphaLanding/alphalanding-1.png",
  "/images/iedar/11.png",
  "/images/Arch/Archy-4.png",
  "/images/itar/itar-2.png",
  "/images/lumen/2.png",
  "/images/omdah/3.png",
];

export default function Home() {
  const clientCount = PROJECTS.filter((p) => p.kind === "client").length;

  return (
    <>
      <Hero
        projectCount={PROJECTS.length}
        clientCount={clientCount}
        years={YEARS_SHIPPING}
      />
      <StackMarquee />
      <Work projects={PROJECTS} />
      <FilmStrip shots={REEL.map((src) => ({ src, alt: "" }))} />
      <About />
      <Contact />
    </>
  );
}
