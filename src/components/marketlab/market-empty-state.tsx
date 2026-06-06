export function MarketEmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
      <h2 className="text-xl font-semibold text-card-foreground">
        No markets yet
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        Markets will appear here once they are available in Supabase. Browse
        fictional Yes/No markets using fake money when they are ready.
      </p>
    </div>
  );
}
