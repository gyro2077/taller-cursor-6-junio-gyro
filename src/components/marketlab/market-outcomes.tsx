import { SurfaceCard } from "@/components/marketlab/surface-card";
import { formatPercent } from "@/lib/markets/format";
import { cn } from "@/lib/utils";

export function MarketOutcomes({ yesChance }: { yesChance: number }) {
  const noChance = 1 - yesChance;

  return (
    <SurfaceCard>
      <h2 className="text-lg font-semibold text-card-foreground">Outcomes</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Current market sentiment from aggregated positions.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <OutcomeCard label="Yes" percent={yesChance} side="yes" />
        <OutcomeCard label="No" percent={noChance} side="no" />
      </div>
    </SurfaceCard>
  );
}

function OutcomeCard({
  label,
  percent,
  side,
}: {
  label: string;
  percent: number;
  side: "yes" | "no";
}) {
  const isYes = side === "yes";

  return (
    <div
      className={cn(
        "rounded-lg border bg-background p-4",
        isYes
          ? "border-emerald-500/30 dark:border-emerald-500/25"
          : "border-rose-500/30 dark:border-rose-500/25",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "text-sm font-medium",
            isYes
              ? "text-emerald-700 dark:text-emerald-300"
              : "text-rose-700 dark:text-rose-300",
          )}
        >
          {label}
        </span>
        <span className="text-2xl font-semibold text-foreground">
          {formatPercent(percent)}
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full",
            isYes ? "bg-emerald-500" : "bg-rose-500",
          )}
          style={{ width: `${Math.round(percent * 100)}%` }}
        />
      </div>
    </div>
  );
}
