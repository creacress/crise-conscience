import Link from "next/link";
import Container from "./Container";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10" role="contentinfo">
      <Container>
        <div className="py-10">
          {/* Navigation SEO riche */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Comprendre</h3>
              <nav className="flex flex-col gap-2 text-sm text-white/60">
                <Link href="/blog/signeaux-emprise" className="hover:text-white transition">Signes d'emprise sectaire</Link>
                <Link href="/articles" className="hover:text-white transition">Analyses et dossiers</Link>
                <Link href="/blog" className="hover:text-white transition">Blog : témoignages et actus</Link>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Agir</h3>
              <nav className="flex flex-col gap-2 text-sm text-white/60">
                <Link href="/ressources" className="hover:text-white transition">Ressources et guides</Link>
                <Link href="/contact" className="hover:text-white transition">Contacter l'association</Link>
                <Link href="/don" className="hover:text-white transition">Soutenir par un don</Link>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">L'association</h3>
              <nav className="flex flex-col gap-2 text-sm text-white/60">
                <Link href="/a-propos" className="hover:text-white transition">À propos</Link>
                <Link href="/inscription" className="hover:text-white transition">Newsletter</Link>
                <a href="https://linkedin.com/in/association-crise-conscience-58a5173a8" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Ressources officielles</h3>
              <nav className="flex flex-col gap-2 text-sm text-white/60">
                <a href="https://www.miviludes.interieur.gouv.fr/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">MIVILUDES</a>
                <a href="https://www.unadfi.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">UNADFI</a>
                <a href="https://www.ccmm.asso.fr/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">CCMM</a>
              </nav>
            </div>
          </div>

          {/* Texte SEO descriptif */}
          <p className="text-xs text-white/40 max-w-3xl mb-6 leading-relaxed">
            Crise Conscience est une association française indépendante de prévention des dérives sectaires.
            Nous proposons des analyses critiques sourcées, des ressources vérifiées et un accompagnement
            pour les personnes concernées par l'emprise psychologique et les manipulations sectaires.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-6">
            <div className="text-xs text-white/50">
              © {new Date().getFullYear()} Crise Conscience — Prévention des dérives sectaires, analyses critiques et ressources vérifiées.
            </div>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <Link href="/a-propos" className="hover:text-white transition">À propos</Link>
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
              <span>contact@criseconscience.org</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}