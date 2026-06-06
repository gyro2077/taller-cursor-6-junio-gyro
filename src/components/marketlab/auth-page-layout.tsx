import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { FakeMoneyChipRow } from "@/components/marketlab/fake-money-chip";
import { SurfaceCard } from "@/components/marketlab/surface-card";

type AuthPageLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthPageLayout({
  title,
  description,
  children,
}: AuthPageLayoutProps) {
  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:py-14">
      <div className="mb-8 text-center">
        <Link
          href="/markets"
          className="mx-auto mb-4 inline-flex items-center gap-2 text-foreground transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo/iso-marketlab.webp"
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-md"
          />
          <span className="text-lg font-semibold tracking-tight">
            MarketLab
          </span>
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <FakeMoneyChipRow
          variants={["workshop"]}
          className="mt-4 justify-center"
        />
      </div>

      <SurfaceCard>{children}</SurfaceCard>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link
          href="/markets"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Back to markets
        </Link>
      </p>
    </div>
  );
}
