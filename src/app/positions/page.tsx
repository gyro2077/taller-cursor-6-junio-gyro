import { PositionsContent } from "@/components/marketlab/positions-content";
import { getPositionsForCurrentUser } from "@/lib/positions/queries";

export default async function PositionsPage() {
  const positions = await getPositionsForCurrentUser();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          My Positions
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Markets where you hold fake-money Yes or No shares.
        </p>
      </div>

      {positions === null ? (
        <PositionsContent isSignedIn={false} />
      ) : (
        <PositionsContent isSignedIn positions={positions} />
      )}
    </div>
  );
}
