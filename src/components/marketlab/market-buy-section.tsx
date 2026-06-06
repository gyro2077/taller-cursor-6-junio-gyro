import { MarketBuyForm } from "@/components/marketlab/market-buy-form";
import { getCurrentUser } from "@/lib/auth/queries";
import { isMarketBuyable } from "@/lib/markets/buyable";
import type { Market } from "@/lib/markets/types";
import { getPositionForUserAndMarket } from "@/lib/positions/queries";
import { getProfileForUser } from "@/lib/profiles/queries";

type MarketBuySectionProps = {
  market: Market;
};

export async function MarketBuySection({ market }: MarketBuySectionProps) {
  const user = await getCurrentUser();
  const profile = user ? await getProfileForUser(user.id) : null;
  const position = user
    ? await getPositionForUserAndMarket(user.id, market.id)
    : null;

  return (
    <MarketBuyForm
      marketId={market.id}
      marketBuyable={isMarketBuyable(market)}
      isSignedIn={Boolean(user)}
      balanceCents={profile?.balance_cents ?? null}
      yesSharesCents={position?.yes_shares_cents ?? 0}
      noSharesCents={position?.no_shares_cents ?? 0}
    />
  );
}
