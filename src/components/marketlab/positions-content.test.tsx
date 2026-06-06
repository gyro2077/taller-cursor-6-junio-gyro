import type { ComponentProps } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PositionsContent } from "@/components/marketlab/positions-content";
import { ThemeProvider } from "@/components/marketlab/theme-provider";
import type { PositionWithMarket } from "@/lib/positions/types";

const position: PositionWithMarket = {
  id: "position-1",
  user_id: "user-1",
  market_id: "market-1",
  yes_shares_cents: 700,
  no_shares_cents: 300,
  created_at: "2026-06-06T12:00:00.000Z",
  updated_at: "2026-06-06T12:00:00.000Z",
  markets: {
    id: "market-1",
    title: "Will it rain tomorrow?",
    description: "Workshop market",
    status: "open",
    close_date: "2026-12-31T18:30:00.000Z",
    created_at: "2026-06-06T10:00:00.000Z",
    updated_at: "2026-06-06T10:00:00.000Z",
  },
};

function renderPositions(props: ComponentProps<typeof PositionsContent>) {
  return renderToStaticMarkup(
    <ThemeProvider>
      <PositionsContent {...props} />
    </ThemeProvider>,
  );
}

describe("PositionsContent", () => {
  it("shows a sign-in message for signed-out users", () => {
    const html = renderPositions({ isSignedIn: false });

    expect(html).toContain('data-slot="signed-out-positions"');
    expect(html).toContain("/sign-in");
    expect(html).not.toContain('data-slot="positions-list"');
  });

  it("shows an empty state when the user has no positions", () => {
    const html = renderPositions({ isSignedIn: true, positions: [] });

    expect(html).toContain('data-slot="empty-positions"');
    expect(html).toContain("/markets");
  });

  it("renders yes, no, total shares and market links", () => {
    const html = renderPositions({
      isSignedIn: true,
      positions: [position],
    });

    expect(html).toContain('data-slot="positions-summary"');
    expect(html).toContain("Markets held");
    expect(html).toContain("Will it rain tomorrow?");
    expect(html).toContain('data-slot="yes-shares"');
    expect(html).toContain('data-slot="no-shares"');
    expect(html).toContain('data-slot="total-shares"');
    expect(html).toContain("$7.00 fake");
    expect(html).toContain("$3.00 fake");
    expect(html).toContain("$10.00 fake");
    expect(html).toContain("/markets/market-1");
    expect(html).toContain('data-slot="view-market-link"');
  });
});
