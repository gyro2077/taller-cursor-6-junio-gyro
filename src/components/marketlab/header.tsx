import { getCurrentUser } from "@/lib/auth/queries";
import { getProfileForUser } from "@/lib/profiles/queries";

import { HeaderContent } from "./header-content";

export async function Header() {
  const user = await getCurrentUser();
  const profile = user ? await getProfileForUser(user.id) : null;

  return (
    <HeaderContent
      isSignedIn={Boolean(user)}
      balanceCents={profile?.balance_cents ?? null}
    />
  );
}
