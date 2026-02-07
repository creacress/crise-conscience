import "./globals.css";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";

import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Crise Conscience",
  description:
    "Association dédiée à la sensibilisation et à la prévention des dérives sectaires.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#0b1220] text-white antialiased">
        {/* glow background */}
        <div className="pointer-events-none fixed inset-0 opacity-40 blur-3xl">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/30" />
          <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-orange-500/25" />
        </div>

        <style>{`
          /* Page transitions (App Router) */
          @keyframes cc-page-enter {
            from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
            to   { opacity: 1; transform: translateY(0);  filter: blur(0); }
          }

          /* The layout persists between navigations, so animate the page root element (children) */
          .cc-page-slot > * {
            animation: cc-page-enter 360ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
          }

          @media (prefers-reduced-motion: reduce) {
            .cc-page-slot > * { animation: none !important; }
          }
        `}</style>

        <div className="relative">
          <SiteHeader />
          <main className="pt-10">
            <div className="cc-page-slot">{children}</div>
          </main>
          <SiteFooter />
          <Analytics />
        </div>
      </body>
    </html>
  );
}