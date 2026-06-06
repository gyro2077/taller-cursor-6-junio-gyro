"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { computeTotalShareCents, formatShareCents } from "@/lib/fake-money";
import { type BuyActionState, buyShares } from "@/lib/markets/actions";
import { formatBalanceCents } from "@/lib/markets/format";

export type MarketBuyFormProps = {
  marketId: string;
  marketBuyable: boolean;
  isSignedIn: boolean;
  balanceCents: number | null;
  yesSharesCents: number;
  noSharesCents: number;
};

const initialState: BuyActionState = {};

export function MarketBuyForm({
  marketId,
  marketBuyable,
  isSignedIn,
  balanceCents,
  yesSharesCents,
  noSharesCents,
}: MarketBuyFormProps) {
  const [state, formAction, isPending] = useActionState(
    buyShares,
    initialState,
  );

  const displayBalance = state.balanceCents ?? balanceCents;
  const displayYesShares = state.yesSharesCents ?? yesSharesCents;
  const displayNoShares = state.noSharesCents ?? noSharesCents;
  const displayTotalShares = computeTotalShareCents(
    displayYesShares,
    displayNoShares,
  );

  return (
    <section
      className="rounded-xl border border-border bg-card p-6 shadow-sm"
      data-slot="market-buy"
    >
      <h2 className="text-lg font-semibold text-card-foreground">
        Buy shares with fake money
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Spend workshop fake dollars to add Yes or No shares. This is not real
        money.
      </p>

      {!isSignedIn ? (
        <div
          className="mt-5 rounded-lg border border-dashed border-border px-4 py-5 text-sm text-muted-foreground"
          data-slot="signed-out-buy"
        >
          <p>Sign in to buy shares with your fake-money balance.</p>
          <Button asChild className="mt-4" size="sm">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      ) : null}

      {isSignedIn && !marketBuyable ? (
        <p
          className="mt-5 text-sm text-muted-foreground"
          data-slot="buy-unavailable"
        >
          Buying is unavailable while this market is closed or past its close
          date.
        </p>
      ) : null}

      {isSignedIn && marketBuyable ? (
        <div className="mt-5 space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                Available balance:
              </span>{" "}
              {displayBalance !== null ? (
                <span data-slot="available-balance">
                  {formatBalanceCents(displayBalance)}
                </span>
              ) : (
                "Profile unavailable"
              )}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                Your position here:
              </span>{" "}
              <span data-slot="market-position">
                Yes {formatShareCents(displayYesShares)}, No{" "}
                {formatShareCents(displayNoShares)} (total{" "}
                {formatShareCents(displayTotalShares)})
              </span>
            </p>
          </div>

          <form action={formAction} className="space-y-5">
            <input type="hidden" name="market_id" value={marketId} />

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-foreground">
                Choose a side
              </legend>
              <div className="flex flex-wrap gap-3">
                {(["yes", "no"] as const).map((side) => (
                  <label
                    key={side}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium capitalize transition-colors"
                  >
                    <input
                      type="radio"
                      name="side"
                      value={side}
                      defaultChecked={side === "yes"}
                      required
                      className="accent-primary"
                    />
                    {side}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="space-y-2">
              <label
                htmlFor="buy-amount"
                className="text-sm font-medium text-foreground"
              >
                Fake dollar amount
              </label>
              <input
                id="buy-amount"
                name="amount"
                type="text"
                inputMode="decimal"
                placeholder="10.00"
                required
                className="flex h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:border-input dark:bg-input/30"
              />
              <p className="text-xs text-muted-foreground">
                1 fake cent spent equals 1 share cent.
              </p>
            </div>

            {state.error ? (
              <p
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                role="alert"
                data-slot="buy-error"
              >
                {state.error}
              </p>
            ) : null}

            {state.success ? (
              <p
                className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300"
                data-slot="buy-success"
              >
                Purchase complete. Your fake balance and position have been
                updated.
              </p>
            ) : null}

            <Button type="submit" disabled={isPending}>
              {isPending ? "Buying..." : "Buy shares"}
            </Button>
          </form>
        </div>
      ) : null}
    </section>
  );
}
