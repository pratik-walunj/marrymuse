export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas">
      <div className="flex flex-col items-center gap-6">
        <div className="relative size-16">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-line border-t-primary" />
          <span className="absolute inset-2 animate-[spin_1.4s_linear_infinite_reverse] rounded-full border-2 border-line border-b-accent" />
        </div>
        <p className="font-display text-lg tracking-wide text-ink">
          Marry<span className="text-gradient-gold">Muse</span>
        </p>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Loading…</p>
      </div>
    </div>
  );
}
