import Link from "next/link";

import { FakeMoneyChip } from "@/components/marketlab/fake-money-chip";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center sm:py-24">
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        404
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        This page does not exist in MarketLab. Head back to browse fictional
        Yes/No markets.
      </p>
      <FakeMoneyChip variant="workshop" className="mt-4" />
      <Button asChild className="mt-8">
        <Link href="/markets">Back to markets</Link>
      </Button>
    </div>
  );
}
