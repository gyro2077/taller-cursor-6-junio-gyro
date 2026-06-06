import Link from "next/link";

import { SignInForm } from "@/components/marketlab/sign-in-form";

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:py-14">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Access your fake-money balance and workshop account.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <SignInForm />
      </div>

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
