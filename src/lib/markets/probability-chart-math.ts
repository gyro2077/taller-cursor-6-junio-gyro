import type { ProbabilityPoint } from "@/lib/markets/types";

export const CHART_WIDTH = 640;
export const CHART_HEIGHT = 240;
export const CHART_PADDING = {
  top: 16,
  right: 16,
  bottom: 32,
  left: 40,
};

export type ChartRange = "all" | "30d" | "7d";

export function filterPointsByRange(
  points: ProbabilityPoint[],
  range: ChartRange,
  now = new Date(),
): ProbabilityPoint[] {
  if (points.length === 0) {
    return points;
  }

  if (range === "all") {
    return points;
  }

  const days = range === "30d" ? 30 : 7;
  const cutoff = now.getTime() - days * 24 * 60 * 60 * 1000;

  const filtered = points.filter(
    (point) => new Date(point.at).getTime() >= cutoff,
  );

  return filtered.length > 0 ? filtered : points;
}

export function buildChartCoordinates(points: ProbabilityPoint[]) {
  if (points.length === 0) {
    return {
      plotWidth: CHART_WIDTH - CHART_PADDING.left - CHART_PADDING.right,
      plotHeight: CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom,
      polyline: "",
      minTime: 0,
      maxTime: 1,
    };
  }

  const plotWidth = CHART_WIDTH - CHART_PADDING.left - CHART_PADDING.right;
  const plotHeight = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;
  const times = points.map((point) => new Date(point.at).getTime());
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  const timeSpan = Math.max(maxTime - minTime, 1);

  const coordinates = points.map((point) => {
    const time = new Date(point.at).getTime();
    const x = CHART_PADDING.left + ((time - minTime) / timeSpan) * plotWidth;
    const y = CHART_PADDING.top + (1 - point.yesChance) * plotHeight;

    return { x, y };
  });

  const polyline = coordinates
    .map((coordinate) => `${coordinate.x},${coordinate.y}`)
    .join(" ");

  return {
    plotWidth,
    plotHeight,
    polyline,
    minTime,
    maxTime,
  };
}

export function formatChartAxisDate(
  timestamp: number,
  locale = "en-US",
): string {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
  }).format(new Date(timestamp));
}
