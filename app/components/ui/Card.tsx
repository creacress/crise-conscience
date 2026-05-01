import Link from "next/link";
import type { ReactNode, HTMLAttributes } from "react";

type CardProps = {
  as?: "div" | "article" | "section";
  href?: string;
  external?: boolean;
  interactive?: boolean;
  padded?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

const baseStatic =
  "rounded-[var(--radius-xl)] border border-[var(--color-border)] " +
  "bg-[var(--color-surface-1)]/70 backdrop-blur-sm " +
  "shadow-[var(--shadow-sm)]";

const baseInteractive =
  baseStatic +
  " transition-[border-color,background-color,box-shadow] duration-[var(--motion-fast)] " +
  "ease-[var(--motion-ease-soft)] cursor-pointer " +
  "hover:bg-[var(--color-surface-2)]/80 hover:border-[var(--color-border-strong)] " +
  "hover:shadow-[var(--shadow-md)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

export default function Card({
  as = "div",
  href,
  external = false,
  interactive,
  padded = true,
  className = "",
  children,
  ...rest
}: CardProps) {
  const isInteractive = interactive ?? Boolean(href);
  const cls = [
    isInteractive ? baseInteractive : baseStatic,
    padded ? "p-6" : "",
    className,
  ].filter(Boolean).join(" ");

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...(rest as HTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...(rest as HTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  const Tag = as;
  return (
    <Tag className={cls} {...(rest as HTMLAttributes<HTMLDivElement>)}>
      {children}
    </Tag>
  );
}
