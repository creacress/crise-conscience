import Link from "next/link";
import Container from "./Container";

const FOOTER_NAV = {
  contenus: [
    { href: "/articles", label: "Articles" },
    { href: "/blog", label: "Blog" },
    { href: "/ressources", label: "Ressources" },
  ],
  asso: [
    { href: "/a-propos", label: "À propos" },
    { href: "/inscription", label: "Lettre d’information" },
    { href: "/don", label: "Soutenir / Don" },
    { href: "/contact", label: "Contact" },
    { href: "https://www.unadfi.org/", label: "UNADFI", external: true },
  ],
  legal: [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/confidentialite", label: "Confidentialité" },
    { href: "/cookies", label: "Cookies" },
  ],
};

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/20">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/30 font-semibold text-orange-300">
                CC
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">Crise Conscience</div>
                <div className="text-xs text-white/55">Prévenir • Informer • Aider</div>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-white/65">
              Crise Conscience est une association loi 1901, partenaire de l’
              <a
                href="https://www.unadfi.org/"
                target="_blank"
                rel="noreferrer"
                className="text-orange-300 hover:underline"
              >
                UNADFI
              </a>
              . Nous luttons contre les <strong className="text-white/90">dérives sectaires</strong> en
              ciblant les comportements d’emprise et leurs conséquences, jamais les croyances individuelles.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                Sources vérifiées
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                Confidentialité
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                Anonymat possible
              </span>
            </div>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Contenus
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {FOOTER_NAV.contenus.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/75 hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Association
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {FOOTER_NAV.asso.map((l) => (
                <li key={l.href}>
                  {"external" in l && l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/75 hover:text-white transition"
                    >
                      {l.label} ↗
                    </a>
                  ) : (
                    <Link href={l.href} className="text-white/75 hover:text-white transition">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Mentions légales
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {FOOTER_NAV.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/75 hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-6 text-white/60">
              <strong className="text-white/85">Urgence ?</strong> Ce site n’est pas un service
              d’urgence. En cas de danger immédiat : 15 / 17 / 18 / 112.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} Association Crise Conscience — Tous droits réservés.
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Contenus rédigés avec assistance IA, relus humainement
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
