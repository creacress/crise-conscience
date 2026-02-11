

// app/components/JsonLd.tsx

import React from "react";

/**
 * Injecte du JSON-LD (schema.org) dans la page.
 * Usage:
 *   <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", ... }} />
 */
export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      // IMPORTANT: data doit être maîtrisé côté serveur (pas de user input brut)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}