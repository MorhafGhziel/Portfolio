import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ThemedToaster from "@/components/ThemedToaster";
import Analytics from "@/components/Analytics";

/**
 * The public site's chrome.
 *
 * This used to live in the root layout, which meant every route got the header,
 * the footer and Lenis smooth scrolling — including /admin, where momentum
 * scrolling on a data table is actively unpleasant. Moving it into a route
 * group keeps the URLs identical while letting the dashboard opt out.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SmoothScroll />

      {/* Keyboard users land here first. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:text-canvas focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <Header />
      <main id="main">{children}</main>
      <Footer />

      <ThemedToaster />
      <Analytics />
    </>
  );
}
