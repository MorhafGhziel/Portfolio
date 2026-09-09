import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Morhaf Ghziel — full-stack developer in Riyadh, available for remote work worldwide.",
};

export default function ContactPage() {
  return <Contact standalone />;
}
