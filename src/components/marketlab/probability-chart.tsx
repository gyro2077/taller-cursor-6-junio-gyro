"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatPercent } from "@/lib/markets/format";
import {
  buildChartCoordinates,
  CHART_HEIGHT,
  CHART_PADDING,
  CHART_WIDTH,
  type ChartRange,
  filterPointsByRange,
  formatChartAxisDate,
} from "@/lib/markets/probability-chart-math";
import type { MarketProbability } from "@/lib/markets/types";

const RANGE_OPTIONS: { label: string; value: ChartRange }[] = [
  { label: "7d", value: "7d" },
  { label: "30d", value: "30d" },
  { label: "All", value: "all" },
];

export function ProbabilityChart({
  probability,
}: {
  probability: MarketProbability;
}) {
  const [range, setRange] = useState<ChartRange>("all");

  const filteredPoints = useMemo(
    () => filterPointsByRange(probability.points, range),
    [probability.points, range],
  );

  const chart = useMemo(
    () => buildChartCoordinates(filteredPoints),
    [filteredPoints],
  );

  const title =
    probability.chartMode === "history"
      ? "Yes probability over time"
      : "Current market balance (no price history)";

  const subtitle =
    probability.chartMode === "history"
      ? "Reconstructed from aggregated trade activity."
      : "Flat line showing the current computed or neutral Yes chance.";

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            {title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <p className="mt-2 text-sm font-medium text-foreground">
            Current Yes chance: {formatPercent(probability.yesChance)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {RANGE_OPTIONS.map((option) => (
            <Button
              key={option.value}
              type="button"
              size="sm"
              variant={range === option.value ? "default" : "outline"}
              onClick={() => setRange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="h-auto w-full min-w-[320px] text-muted-foreground"
          role="img"
          aria-label={title}
        >
          <title>{title}</title>
          <line
            x1={CHART_PADDING.left}
            y1={CHART_PADDING.top}
            x2={CHART_PADDING.left}
            y2={CHART_HEIGHT - CHART_PADDING.bottom}
            className="stroke-border"
            strokeWidth="1"
          />
          <line
            x1={CHART_PADDING.left}
            y1={CHART_HEIGHT - CHART_PADDING.bottom}
            x2={CHART_WIDTH - CHART_PADDING.right}
            y2={CHART_HEIGHT - CHART_PADDING.bottom}
            className="stroke-border"
            strokeWidth="1"
          />

          {[0, 25, 50, 75, 100].map((tick) => {
            const y =
              CHART_PADDING.top +
              (1 - tick / 100) *
                (CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom);

            return (
              <g key={tick}>
                <line
                  x1={CHART_PADDING.left - 4}
                  y1={y}
                  x2={CHART_PADDING.left}
                  y2={y}
                  className="stroke-border"
                  strokeWidth="1"
                />
                <text
                  x={CHART_PADDING.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-muted-foreground text-[10px]"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          <text
            x={CHART_PADDING.left}
            y={CHART_HEIGHT - 8}
            className="fill-muted-foreground text-[10px]"
          >
            {formatChartAxisDate(chart.minTime)}
          </text>
          <text
            x={CHART_WIDTH - CHART_PADDING.right}
            y={CHART_HEIGHT - 8}
            textAnchor="end"
            className="fill-muted-foreground text-[10px]"
          >
            {formatChartAxisDate(chart.maxTime)}
          </text>

          {chart.polyline ? (
            <polyline
              fill="none"
              className="stroke-chart-1"
              strokeWidth="2"
              points={chart.polyline}
            />
          ) : null}
        </svg>
      </div>
    </section>
  );
}
