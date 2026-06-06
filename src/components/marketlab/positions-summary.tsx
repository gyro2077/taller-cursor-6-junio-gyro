import { SurfaceCard } from "@/components/marketlab/surface-card";
import { computeTotalShareCents, formatShareCents } from "@/lib/fake-money";
import type { PositionWithMarket } from "@/lib/positions/types";

type PositionsSummaryProps = {
  positions: PositionWithMarket[];
};

export function PositionsSummary({ positions }: PositionsSummaryProps) {
  const marketsHeld = positions.length;
  let yesExposure = 0;
  let noExposure = 0;

  for (const position of positions) {
    yesExposure += position.yes_shares_cents;
    noExposure += position.no_shares_cents;
  }

  const totalShares = computeTotalShareCents(yesExposure, noExposure);

  const stats = [
    { label: "Markets held", value: String(marketsHeld) },
    { label: "Total shares", value: formatShareCents(totalShares) },
    {
      label: "Yes exposure",
      value: formatShareCents(yesExposure),
      valueClassName: "text-emerald-700 dark:text-emerald-300",
    },
    {
      label: "No exposure",
      value: formatShareCents(noExposure),
      valueClassName: "text-rose-700 dark:text-rose-300",
    },
  ];

  return (
    <SurfaceCard
      padding="md"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      data-slot="positions-summary"
    >
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {stat.label}
          </p>
          <p
            className={`mt-1 text-lg font-semibold tabular-nums text-foreground ${stat.valueClassName ?? ""}`}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </SurfaceCard>
  );
}
