import { formatPercent } from "@/lib/markets/format";

export function MarketOutcomes({ yesChance }: { yesChance: number }) {
  const noChance = 1 - yesChance;

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-card-foreground">Outcomes</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Current market sentiment from aggregated positions.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <OutcomeCard
          label="Yes"
          percent={yesChance}
          accentClass="bg-emerald-500"
        />
        <OutcomeCard label="No" percent={noChance} accentClass="bg-rose-500" />
      </div>
    </section>
  );
}

function OutcomeCard({
  label,
  percent,
  accentClass,
}: {
  label: string;
  percent: number;
  accentClass: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-2xl font-semibold text-foreground">
          {formatPercent(percent)}
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${accentClass}`}
          style={{ width: `${Math.round(percent * 100)}%` }}
        />
      </div>
    </div>
  );
}
