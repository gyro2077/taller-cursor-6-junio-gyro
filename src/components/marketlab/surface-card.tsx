import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SurfaceCardProps = {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  "data-slot"?: string;
};

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function SurfaceCard({
  children,
  className,
  padding = "lg",
  "data-slot": dataSlot,
}: SurfaceCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card shadow-sm",
        paddingClasses[padding],
        className,
      )}
      data-slot={dataSlot}
    >
      {children}
    </div>
  );
}
