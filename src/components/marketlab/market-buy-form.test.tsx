import type { ComponentProps } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MarketBuyForm } from "@/components/marketlab/market-buy-form";
import { ThemeProvider } from "@/components/marketlab/theme-provider";

function renderForm(props: ComponentProps<typeof MarketBuyForm>) {
  return renderToStaticMarkup(
    <ThemeProvider>
      <MarketBuyForm {...props} />
    </ThemeProvider>,
  );
}

describe("MarketBuyForm", () => {
  it("asks signed-out users to sign in", () => {
    const html = renderForm({
      marketId: "market-1",
      marketBuyable: true,
      isSignedIn: false,
      balanceCents: null,
      yesSharesCents: 0,
      noSharesCents: 0,
    });

    expect(html).toContain('data-slot="signed-out-buy"');
    expect(html).toContain("/sign-in");
    expect(html).not.toContain('name="amount"');
  });

  it("shows unavailable message for closed markets", () => {
    const html = renderForm({
      marketId: "market-1",
      marketBuyable: false,
      isSignedIn: true,
      balanceCents: 10000,
      yesSharesCents: 0,
      noSharesCents: 0,
    });

    expect(html).toContain('data-slot="buy-unavailable"');
    expect(html).not.toContain('name="amount"');
  });

  it("renders buy fields for signed-in users on open markets", () => {
    const html = renderForm({
      marketId: "market-1",
      marketBuyable: true,
      isSignedIn: true,
      balanceCents: 10000,
      yesSharesCents: 500,
      noSharesCents: 200,
    });

    expect(html).toContain('name="market_id"');
    expect(html).toContain('name="side"');
    expect(html).toContain('name="amount"');
    expect(html).toContain("$100.00 fake");
    expect(html).toContain("Yes $5.00 fake");
    expect(html).toContain("No $2.00 fake");
    expect(html).toContain("Buy shares");
    expect(html).toContain("fake money");
  });
});
