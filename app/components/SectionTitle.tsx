export default function SectionTitle({
    eyebrow,
    title,
    desc,
  }: {
    eyebrow?: string;
    title: string;
    desc?: string;
  }) {
    return (
      <div className="mb-8">
        {eyebrow && (
          <div className="mb-2 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            {eyebrow}
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
        {desc && <p className="mt-2 text-white/70 max-w-2xl">{desc}</p>}
      </div>
    );
  }