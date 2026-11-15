import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Motion from "@/components/Motion";
import Nav from "@/components/Nav";
import { PageTransition } from "@/components/PageTransition";
import Preloader from "@/components/Preloader";
import { Mark, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: {
    default: "Sri Vardhan Mothukuri · Cloud and software engineering",
    template: "%s · Sri Vardhan Mothukuri",
  },
  description:
    "Portfolio of Sri Vardhan Mothukuri, a developer building automation, Kubernetes and LLM-powered systems.",
};

// Runs before the first paint. It switches the startup sequence on for the
// first page of a browser session, unless the visitor prefers reduced motion.
const PRELOADER_SCRIPT = `
try {
  var seen = sessionStorage.getItem("intro-seen");
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!seen && !calm) document.documentElement.setAttribute("data-preloading", "");
} catch (error) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_SCRIPT }} />
      </head>
      <body>
        <Preloader />
        <PageTransition>
          <Motion />
          <Mark />
          <Nav />
          {children}
          <SiteFooter />
          <Cursor />
        </PageTransition>
      </body>
    </html>
  );
}
