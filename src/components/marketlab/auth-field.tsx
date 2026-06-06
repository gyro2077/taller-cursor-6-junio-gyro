import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type AuthFieldProps = {
  label: string;
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function AuthField({ label, id, className, ...props }: AuthFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "flex h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:border-input dark:bg-input/30",
          className,
        )}
        {...props}
      />
    </div>
  );
}
