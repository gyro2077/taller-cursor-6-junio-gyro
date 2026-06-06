"use client";

import Link from "next/link";
import { useActionState } from "react";

import { AuthField } from "@/components/marketlab/auth-field";
import { Button } from "@/components/ui/button";
import { type AuthActionState, signIn } from "@/lib/auth/actions";

const initialState: AuthActionState = {};

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <AuthField
        id="sign-in-email"
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        required
      />
      <AuthField
        id="sign-in-password"
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
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
        {isPending ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Need an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
