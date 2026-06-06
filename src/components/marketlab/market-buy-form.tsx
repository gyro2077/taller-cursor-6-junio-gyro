"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

import { FakeMoneyChip } from "@/components/marketlab/fake-money-chip";
import { SurfaceCard } from "@/components/marketlab/surface-card";
import { Button } from "@/components/ui/button";
import {
  computeTotalShareCents,
  formatShareCents,
  parseDollarInputToCents,
} from "@/lib/fake-money";
import { inputClassName } from "@/lib/input-styles";
import { type BuyActionState, buyShares } from "@/lib/markets/actions";
import { formatBalanceCents } from "@/lib/markets/format";
import { cn } from "@/lib/utils";

export type MarketBuyFormProps = {
  marketId: string;
  marketBuyable: boolean;
  isSignedIn: boolean;
  balanceCents: number | null;
  yesSharesCents: number;
  noSharesCents: number;
};

const initialState: BuyActionState = {};

const SIDE_STYLES = {
  yes: {
    selected:
      "border-emerald-500/50 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200",
    default: "border-border hover:border-emerald-500/30",
  },
  no: {
    selected:
      "border-rose-500/50 bg-rose-500/10 text-rose-800 dark:text-rose-200",
    default: "border-border hover:border-rose-500/30",
  },
} as const;

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
  const [selectedSide, setSelectedSide] = useState<"yes" | "no">("yes");
  const [amountInput, setAmountInput] = useState("");

  const displayBalance = state.balanceCents ?? balanceCents;
  const displayYesShares = state.yesSharesCents ?? yesSharesCents;
  const displayNoShares = state.noSharesCents ?? noSharesCents;
  const displayTotalShares = computeTotalShareCents(
    displayYesShares,
    displayNoShares,
  );

  const parsedAmount = parseDollarInputToCents(amountInput);
  const previewShareCents = parsedAmount.ok ? parsedAmount.cents : null;

  return (
    <SurfaceCard data-slot="market-buy">
      <h2 className="text-lg font-semibold text-card-foreground">
        Buy shares with fake money
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Spend fake cents to collect Yes or No shares.
      </p>
      <div className="mt-3">
        <FakeMoneyChip variant="conversion" />
      </div>

      {!isSignedIn ? (
        <div className="mt-5 space-y-4">
          {!marketBuyable ? (
            <p
              className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-800 dark:text-amber-200"
              data-slot="buy-unavailable"
            >
              Buying is unavailable while this market is closed or past its
              close date.
            </p>
          ) : null}
          <div
            className="rounded-lg border border-dashed border-border px-4 py-5 text-sm text-muted-foreground"
            data-slot="signed-out-buy"
          >
            <p>Sign in to buy shares with your fake-money balance.</p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </div>
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
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium capitalize transition-colors",
                      selectedSide === side
                        ? SIDE_STYLES[side].selected
                        : SIDE_STYLES[side].default,
                    )}
                  >
                    <input
                      type="radio"
                      name="side"
                      value={side}
                      checked={selectedSide === side}
                      onChange={() => setSelectedSide(side)}
                      required
                      className="sr-only"
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
                value={amountInput}
                onChange={(event) => setAmountInput(event.target.value)}
                className={inputClassName}
              />
              <p className="text-xs text-muted-foreground">
                1 fake cent spent = 1 share cent.
              </p>
              {previewShareCents !== null ? (
                <p
                  className="text-sm text-muted-foreground"
                  data-slot="buy-preview"
                >
                  <span className="font-medium text-foreground">Preview:</span>{" "}
                  {formatShareCents(previewShareCents)} in{" "}
                  {selectedSide === "yes" ? "Yes" : "No"} shares
                </p>
              ) : null}
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
    </SurfaceCard>
  );
}
