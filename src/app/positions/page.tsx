import { FakeMoneyChipRow } from "@/components/marketlab/fake-money-chip";
import { PageHeader } from "@/components/marketlab/page-header";
import { PositionsContent } from "@/components/marketlab/positions-content";
import { getPositionsForCurrentUser } from "@/lib/positions/queries";

export default async function PositionsPage() {
  const positions = await getPositionsForCurrentUser();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <PageHeader
        title="My Positions"
        description="Markets where you hold fake-money Yes or No shares."
      >
        <FakeMoneyChipRow variants={["workshop", "conversion"]} />
      </PageHeader>

      {positions === null ? (
        <PositionsContent isSignedIn={false} />
      ) : (
        <PositionsContent isSignedIn positions={positions} />
      )}
    </div>
  );
}
