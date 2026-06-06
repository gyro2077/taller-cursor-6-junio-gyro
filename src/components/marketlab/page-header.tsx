import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
};

export function PageHeader({
  title,
  description,
  children,
  className,
  titleClassName,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <h1
        className={cn(
          "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
          titleClassName,
        )}
      >
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          {description}
        </p>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
