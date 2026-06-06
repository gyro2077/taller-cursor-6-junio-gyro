import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
  "data-slot"?: string;
};

export function EmptyState({
  title,
  description,
  children,
  className,
  "data-slot": dataSlot,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center shadow-sm",
        className,
      )}
      data-slot={dataSlot}
    >
      <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
