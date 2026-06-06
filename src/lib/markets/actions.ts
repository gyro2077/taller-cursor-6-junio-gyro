"use server";

import { revalidatePath } from "next/cache";

import { parseDollarInputToCents, parseTradeSideInput } from "@/lib/fake-money";
import { isMarketBuyable } from "@/lib/markets/buyable";
import { getMarketById } from "@/lib/markets/queries";
import { getPositionForUserAndMarket } from "@/lib/positions/queries";
import { getProfileForUser } from "@/lib/profiles/queries";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type BuyActionState = {
  error?: string;
  success?: boolean;
  balanceCents?: number;
  yesSharesCents?: number;
  noSharesCents?: number;
};

function mapRpcError(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("not authenticated")) {
    return "Sign in to buy shares.";
  }

  if (normalized.includes("invalid amount")) {
    return "Enter a positive fake dollar amount.";
  }

  if (normalized.includes("invalid side")) {
    return "Choose Yes or No.";
  }

  if (normalized.includes("market not found")) {
    return "This market is not available.";
  }

  if (
    normalized.includes("market not open") ||
    normalized.includes("market closed")
  ) {
    return "Buying is unavailable while this market is closed or past its close date.";
  }

  if (normalized.includes("insufficient balance")) {
    return "You do not have enough fake balance for this purchase.";
  }

  return "Could not complete this purchase. Try again.";
}

export async function buyShares(
  _prevState: BuyActionState,
  formData: FormData,
): Promise<BuyActionState> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sign in to buy shares." };
  }

  const marketId = String(formData.get("market_id") ?? "").trim();
  const sideInput = String(formData.get("side") ?? "").trim();
  const amountInput = String(formData.get("amount") ?? "").trim();

  if (!marketId) {
    return { error: "This market is not available." };
  }

  const side = parseTradeSideInput(sideInput);

  if (!side) {
    return { error: "Choose Yes or No." };
  }

  const amountResult = parseDollarInputToCents(amountInput);

  if (!amountResult.ok) {
    return { error: amountResult.error };
  }

  const market = await getMarketById(marketId);

  if (!market) {
    return { error: "This market is not available." };
  }

  if (!isMarketBuyable(market)) {
    return {
      error:
        "Buying is unavailable while this market is closed or past its close date.",
    };
  }

  const { error } = await supabase.rpc("buy_shares", {
    p_market_id: marketId,
    p_side: side,
    p_amount_cents: amountResult.cents,
  });

  if (error) {
    return { error: mapRpcError(error.message) };
  }

  const profile = await getProfileForUser(user.id);
  const position = await getPositionForUserAndMarket(user.id, marketId);

  revalidatePath("/", "layout");
  revalidatePath(`/markets/${marketId}`);
  revalidatePath("/positions");

  return {
    success: true,
    balanceCents: profile?.balance_cents ?? 0,
    yesSharesCents: position?.yes_shares_cents ?? 0,
    noSharesCents: position?.no_shares_cents ?? 0,
  };
}
