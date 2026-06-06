import Image from "next/image";
import Link from "next/link";

import { MainNav } from "@/components/marketlab/main-nav";
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
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3 sm:gap-6">
            <Link
              href="/markets"
              className="flex shrink-0 items-center gap-2.5 text-foreground transition-opacity hover:opacity-80"
            >
              <Image
                src="/logo/iso-marketlab.webp"
                alt=""
                width={28}
                height={28}
                className="size-7 rounded-md"
                priority
              />
              <span className="text-lg font-semibold tracking-tight">
                MarketLab
              </span>
            </Link>
            <MainNav className="hidden sm:flex" />
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {isSignedIn ? (
              <div
                className="flex items-center gap-2 sm:gap-3"
                data-slot="signed-in-actions"
              >
                {balanceCents !== null ? (
                  <p
                    className="max-w-[9rem] truncate rounded-full border border-border bg-muted/60 px-3 py-1 text-sm font-medium text-foreground tabular-nums sm:max-w-none"
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
                className="flex items-center gap-1.5 sm:gap-2"
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

        <MainNav className="mt-3 sm:hidden" />
      </div>
    </header>
  );
}
