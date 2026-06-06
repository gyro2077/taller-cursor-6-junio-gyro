import { FakeMoneyChipRow } from "@/components/marketlab/fake-money-chip";
import { MarketCard } from "@/components/marketlab/market-card";
import { MarketEmptyState } from "@/components/marketlab/market-empty-state";
import { PageHeader } from "@/components/marketlab/page-header";
import { getMarkets } from "@/lib/markets/queries";

export default async function MarketsPage() {
  const markets = await getMarkets();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <PageHeader
        title="Markets"
        description="Browse fictional Yes/No markets using fake money."
      >
        <FakeMoneyChipRow variants={["workshop", "spend"]} />
      </PageHeader>

      {markets.length === 0 ? (
        <MarketEmptyState />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      )}
    </div>
  );
}
