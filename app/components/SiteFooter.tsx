import Link from "next/link";
import Container from "./Container";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <Container>
        <div className="py-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-white/70">
            © {new Date().getFullYear()} Crise Conscience — Sensibilisation & prévention des dérives sectaires.
          </div>
          <div className="flex items-center gap-4 text-sm text-white/70">
            <Link href="/a-propos" className="hover:text-white transition">À propos</Link>
            <Link href="/ressources" className="hover:text-white transition">Ressources</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}