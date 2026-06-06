import Link from "next/link";

import { EmptyState } from "@/components/marketlab/empty-state";
import { PositionCard } from "@/components/marketlab/position-card";
import { PositionsSummary } from "@/components/marketlab/positions-summary";
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
      <EmptyState
        title="Sign in to view your positions"
        description="Your fake-money positions are private. Sign in to see the markets where you hold Yes or No shares."
        data-slot="signed-out-positions"
      >
        <Button asChild size="sm">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </EmptyState>
    );
  }

  if (props.positions.length === 0) {
    return (
      <EmptyState
        title="No positions yet"
        description="Buy Yes or No shares in an open market to see your fake-money positions here."
        data-slot="empty-positions"
      >
        <Button asChild variant="outline" size="sm">
          <Link href="/markets">Browse markets</Link>
        </Button>
      </EmptyState>
    );
  }

  return (
    <div className="space-y-6" data-slot="positions-list">
      <PositionsSummary positions={props.positions} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {props.positions.map((position) => (
          <PositionCard key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
}
