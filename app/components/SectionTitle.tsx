type Props = {
  eyebrow?: string;
  title: string;
  desc?: string;
  /** Niveau de heading. Défaut h2. Sur les pages où c'est le titre principal, passer "h1". */
  as?: "h1" | "h2" | "h3";
};

export default function SectionTitle({ eyebrow, title, desc, as = "h2" }: Props) {
  const Tag = as;
  return (
    <div className="mb-8">
      {eyebrow && (
        <div className="mb-2 inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1 text-xs text-[var(--color-text-muted)]">
          {eyebrow}
        </div>
      )}
      <Tag className="font-display text-2xl font-semibold tracking-tight text-[var(--color-text)] sm:text-3xl">
        {title}
      </Tag>
      {desc && <p className="mt-2 max-w-2xl text-[var(--color-text-muted)]">{desc}</p>}
    </div>
  );
}
