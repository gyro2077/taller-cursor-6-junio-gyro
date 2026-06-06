import Link from "next/link";
import { notFound } from "next/navigation";

import { MarketBuyPlaceholder } from "@/components/marketlab/market-buy-placeholder";
import { MarketDetailInfo } from "@/components/marketlab/market-detail-info";
import { MarketOutcomes } from "@/components/marketlab/market-outcomes";
import { ProbabilityChart } from "@/components/marketlab/probability-chart";
import { getMarketProbability } from "@/lib/markets/probability";
import { getMarketById } from "@/lib/markets/queries";

type MarketDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MarketDetailPage({
  params,
}: MarketDetailPageProps) {
  const { id } = await params;
  const market = await getMarketById(id);

  if (!market) {
    notFound();
  }

  const probability = await getMarketProbability(market);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
      <Link
        href="/markets"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to markets
      </Link>

      <div className="mt-6 space-y-6">
        <MarketDetailInfo market={market} />
        <MarketOutcomes yesChance={probability.yesChance} />
        <ProbabilityChart probability={probability} />
        <MarketBuyPlaceholder market={market} />
      </div>
    </div>
  );
}
