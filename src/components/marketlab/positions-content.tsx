import Link from "next/link";

import { PositionCard } from "@/components/marketlab/position-card";
import { Button } from "@/components/ui/button";
import type { PositionWithMarket } from "@/lib/positions/types";

export type PositionsContentProps =
  | {
      isSignedIn: true;
      positions: PositionWithMarket[];
    }
  | {
      isSignedIn: false;
    };

export function PositionsContent(props: PositionsContentProps) {
  if (!props.isSignedIn) {
    return (
      <div
        className="rounded-xl border border-border bg-card px-6 py-10 text-center shadow-sm"
        data-slot="signed-out-positions"
      >
        <h2 className="text-xl font-semibold text-card-foreground">
          Sign in to view your positions
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Your fake-money positions are private. Sign in to see the markets
          where you hold Yes or No shares.
        </p>
        <Button asChild className="mt-6" size="sm">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    );
  }

  if (props.positions.length === 0) {
    return (
      <div
        className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center"
        data-slot="empty-positions"
      >
        <h2 className="text-xl font-semibold text-card-foreground">
          No positions yet
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Buy Yes or No shares in an open market to see your fake-money
          positions here.
        </p>
        <Button asChild className="mt-6" variant="outline" size="sm">
          <Link href="/markets">Browse markets</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2" data-slot="positions-list">
      {props.positions.map((position) => (
        <PositionCard key={position.id} position={position} />
      ))}
    </div>
  );
}
