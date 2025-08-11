import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import VendorStatsCard from "@/components/vendors/VendorStatsCard";
import VendorTable from "@/components/vendors/VendorTable";
import { Suspense } from "react";

const vendorPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <VendorStatsCard />

      <Suspense fallback={<TopChannelsSkeleton />}>
        <VendorTable />
      </Suspense>
    </div>
  );
};

export default vendorPage;
