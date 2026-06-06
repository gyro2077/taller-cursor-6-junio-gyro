import { AuthPageLayout } from "@/components/marketlab/auth-page-layout";
import { SignInForm } from "@/components/marketlab/sign-in-form";

export default function SignInPage() {
  return (
    <AuthPageLayout
      title="Sign in"
      description="Access your fake-money balance and workshop account."
    >
      <SignInForm />
    </AuthPageLayout>
  );
}
