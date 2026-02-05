import "./globals.css";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";

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

        <div className="relative">
          <SiteHeader />
          <main className="pt-10">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}