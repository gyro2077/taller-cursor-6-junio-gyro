import { EmptyState } from "@/components/marketlab/empty-state";

export function MarketEmptyState() {
  return (
    <EmptyState
      title="No markets yet"
      description="Browse fictional Yes/No markets using fake money when markets are available."
    />
  );
}
