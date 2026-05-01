/**
 * SkipLink — accessibilité.
 * Premier élément focusable du DOM. Visible uniquement au focus clavier.
 * WCAG 2.1 AA — Bypass Blocks.
 */
export default function SkipLink({ label }: { label?: string } = {}) {
  return (
    <a href="#main" className="skip-link">
      {label ?? "Aller au contenu principal"}
    </a>
  );
}
