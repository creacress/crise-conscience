import Link from "next/link";
import Tag from "@/app/components/ui/Tag";

type Props = {
  href: string;
  title: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  readingTime?: string;
  coverImage?: string;
  /** dimensions du visuel (width/height) — corrige CLS */
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
};

const COVER_GRADIENTS = [
  "linear-gradient(135deg, rgba(251,146,60,0.55) 0%, rgba(56,189,248,0.35) 100%)",
  "linear-gradient(135deg, rgba(56,189,248,0.50) 0%, rgba(167,243,208,0.30) 100%)",
  "linear-gradient(135deg, rgba(167,243,208,0.40) 0%, rgba(251,146,60,0.40) 100%)",
  "linear-gradient(135deg, rgba(251,146,60,0.45) 0%, rgba(167,243,208,0.30) 100%)",
];

function gradientFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return COVER_GRADIENTS[Math.abs(hash) % COVER_GRADIENTS.length];
}

function initialsOf(title: string): string {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function ArticleCard({
  href,
  title,
  excerpt,
  category,
  publishedAt,
  readingTime,
  coverImage,
  imageWidth = 800,
  imageHeight = 450,
  className = "",
}: Props) {
  const dateLabel = formatDate(publishedAt);
  const meta = [dateLabel, readingTime].filter(Boolean).join(" • ");

  return (
    <Link
      href={href}
      className={[
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)]",
        "border border-[var(--color-border)] bg-[var(--color-surface-1)]/70",
        "shadow-[var(--shadow-sm)]",
        "transition-[border-color,background-color,box-shadow] duration-[var(--motion-fast)] ease-[var(--motion-ease-soft)]",
        "hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]/80 hover:shadow-[var(--shadow-md)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
        className,
      ].join(" ")}
    >
      {/* Cover */}
      <div
        className="relative aspect-[16/9] w-full overflow-hidden"
        style={{ aspectRatio: `${imageWidth}/${imageHeight}` }}
      >
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt=""
            width={imageWidth}
            height={imageHeight}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="relative flex h-full w-full items-center justify-center"
            style={{ background: gradientFor(title) }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
            <span className="font-display text-5xl font-semibold text-[var(--color-text)] [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]">
              {initialsOf(title) || "CC"}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-1)]/70 via-transparent to-transparent" />
        {category ? (
          <div className="absolute left-3 top-3">
            <Tag tone="accent" size="sm">{category}</Tag>
          </div>
        ) : null}
      </div>

      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-[var(--color-text)] text-balance">
          {title}
        </h3>
        {excerpt ? (
          <p className="text-sm leading-6 text-[var(--color-text-muted)] line-clamp-3">{excerpt}</p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs text-[var(--color-text-subtle)]">
          {meta ? <span>{meta}</span> : <span aria-hidden="true" />}
          <span className="inline-flex items-center gap-1 text-[var(--color-accent)] transition-colors duration-[var(--motion-fast)] group-hover:text-[var(--color-accent-hover)]">
            Lire
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
