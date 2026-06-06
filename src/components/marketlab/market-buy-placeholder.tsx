import { Button } from "@/components/ui/button";
import { isMarketBuyable } from "@/lib/markets/buyable";
import type { Market } from "@/lib/markets/types";

export function MarketBuyPlaceholder({ market }: { market: Market }) {
  const buyable = isMarketBuyable(market);

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-card-foreground">Trade</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {buyable
          ? "Buying and selling will be available in a later workshop step."
          : "Buying is unavailable while this market is closed or past its close date."}
      </p>

      <div className="mt-5">
        <Button disabled type="button">
          {buyable ? "Trading coming soon" : "Buying unavailable"}
        </Button>
      </div>
    </section>
  );
}
