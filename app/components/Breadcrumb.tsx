import Link from "next/link";
import { JsonLd } from "./JsonLd";

type BreadcrumbItem = {
  label: string;
  href: string;
};

const siteBase = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.criseconscience.org").replace(/\/$/, "");

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ label: "Accueil", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: `${siteBase}${item.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-[var(--color-text-subtle)]">
        <ol className="flex flex-wrap items-center gap-1">
          {allItems.map((item, idx) => (
            <li key={item.href} className="flex items-center gap-1">
              {idx > 0 && <span aria-hidden="true">/</span>}
              {idx === allItems.length - 1 ? (
                <span className="text-white/70" aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-white transition">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
