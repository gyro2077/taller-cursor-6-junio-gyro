import Link from "next/link";

import { SignOutButton } from "@/components/marketlab/sign-out-button";
import { ThemeToggle } from "@/components/marketlab/theme-toggle";
import { Button } from "@/components/ui/button";
import { formatBalanceCents } from "@/lib/markets/format";

export type HeaderContentProps = {
  isSignedIn: boolean;
  balanceCents: number | null;
};

export function HeaderContent({
  isSignedIn,
  balanceCents,
}: HeaderContentProps) {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-6">
          <Link
            href="/markets"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            MarketLab
          </Link>
          <nav aria-label="Main" className="flex items-center gap-4">
            <Link
              href="/markets"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Markets
            </Link>
            <Link
              href="/positions"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              My Positions
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <div
              className="flex items-center gap-3"
              data-slot="signed-in-actions"
            >
              {balanceCents !== null ? (
                <p
                  className="text-sm font-medium text-foreground tabular-nums"
                  data-slot="fake-balance"
                >
                  {formatBalanceCents(balanceCents)}
                </p>
              ) : (
                <p
                  className="text-sm text-muted-foreground"
                  data-slot="missing-profile"
                >
                  Profile unavailable
                </p>
              )}
              <SignOutButton />
            </div>
          ) : (
            <div
              className="flex items-center gap-2"
              data-slot="signed-out-actions"
            >
              <Button asChild variant="ghost" size="sm">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
