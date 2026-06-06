import type { InputHTMLAttributes } from "react";

import { inputClassName } from "@/lib/input-styles";
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
      <input id={id} className={cn(inputClassName, className)} {...props} />
    </div>
  );
}
