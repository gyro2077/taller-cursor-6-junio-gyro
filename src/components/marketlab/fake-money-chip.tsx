import { cn } from "@/lib/utils";

export type FakeMoneyChipVariant =
  | "workshop"
  | "browse"
  | "spend"
  | "conversion";

const CHIP_COPY: Record<FakeMoneyChipVariant, string> = {
  workshop: "This workshop app does not use real money.",
  browse: "Browse fictional Yes/No markets using fake money.",
  spend: "Spend fake cents to collect Yes or No shares.",
  conversion: "1 fake cent spent = 1 share cent.",
};

type FakeMoneyChipProps = {
  variant: FakeMoneyChipVariant;
  className?: string;
};

export function FakeMoneyChip({ variant, className }: FakeMoneyChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-brand/25 bg-brand/8 px-3 py-1 text-xs font-medium text-foreground dark:border-brand/30 dark:bg-brand/12",
        className,
      )}
    >
      {CHIP_COPY[variant]}
    </span>
  );
}

export function FakeMoneyChipRow({
  variants,
  className,
}: {
  variants: FakeMoneyChipVariant[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {variants.map((variant) => (
        <FakeMoneyChip key={variant} variant={variant} />
      ))}
    </div>
  );
}
