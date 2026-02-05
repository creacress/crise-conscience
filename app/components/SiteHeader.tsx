import Link from "next/link";
import Container from "./Container";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/blog", label: "Blog" },
  { href: "/articles", label: "Articles" },
  { href: "/ressources", label: "Ressources" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1220]/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
            <span className="font-semibold tracking-tight">Crise Conscience</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white transition">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="inline-flex items-center rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-black hover:brightness-110 transition"
          >
            Rejoindre / Aider
          </Link>
        </div>
      </Container>
    </header>
  );
}