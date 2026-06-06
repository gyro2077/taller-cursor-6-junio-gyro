"use client";

import Link from "next/link";
import { useActionState } from "react";

import { AuthField } from "@/components/marketlab/auth-field";
import { Button } from "@/components/ui/button";
import { type AuthActionState, signUp } from "@/lib/auth/actions";

const initialState: AuthActionState = {};

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  if (state.needsEmailConfirmation) {
    return (
      <div className="space-y-4 rounded-xl border border-border bg-muted/30 px-5 py-6 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          Check your email
        </h2>
        <p className="text-sm text-muted-foreground">
          We sent a confirmation link. Open it to finish creating your account,
          then sign in.
        </p>
        <Button asChild variant="outline">
          <Link href="/sign-in">Back to sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <AuthField
          id="sign-up-first-name"
          name="first_name"
          type="text"
          label="First name"
          autoComplete="given-name"
          required
        />
        <AuthField
          id="sign-up-last-name"
          name="last_name"
          type="text"
          label="Last name"
          autoComplete="family-name"
          required
        />
      </div>
      <AuthField
        id="sign-up-email"
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        required
      />
      <AuthField
        id="sign-up-password"
        name="password"
        type="password"
        label="Password"
        autoComplete="new-password"
        minLength={6}
        required
      />

      {state.error ? (
        <p
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Sign up"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
