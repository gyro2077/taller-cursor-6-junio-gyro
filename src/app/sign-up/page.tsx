import { AuthPageLayout } from "@/components/marketlab/auth-page-layout";
import { SignUpForm } from "@/components/marketlab/sign-up-form";

export default function SignUpPage() {
  return (
    <AuthPageLayout
      title="Sign up"
      description="Create a workshop account with $100.00 fake to start exploring markets."
    >
      <SignUpForm />
    </AuthPageLayout>
  );
}
