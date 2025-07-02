import fetchStatistics from "@/lib/apis/statistics.api";
import StatisticsCards from "./_components/cards";
import { DoughnutPieChart } from "./_components/pie";
import { RevenueChart } from "./_components/revenue-chart";
import TopSellingProducts from "./_components/top-selling-products";
import LowStockProducts from "./_components/low-stock-products";
import CategoriesList from "./_components/categories-list";

interface GridSectionProps {
  children: React.ReactNode;
  gridTemplateColumns: string;
}

const GridSection = ({ children, gridTemplateColumns }: GridSectionProps) => (
  <div
    className={`grid grid-cols-12 md:grid-cols-${gridTemplateColumns} gap-6 items-stretch`}
  >
    {children}
  </div>
);
export default async function Dashboard() {
  // Fetch Statistics
  const response = await fetchStatistics();
  // Handle null
  if (!response) {
    return <div className="text-red-500">Error loading statistics</div>;
  }
  const statistics = response.statistics;

  return (
    <>
      <div className="space-y-6">
        {/* Section One */}
        <GridSection gridTemplateColumns="12">
          <div className="md:col-span-6">
            <StatisticsCards statistics={statistics} />
          </div>
          <div className="md:col-span-6">
            <CategoriesList statistics={statistics} />
          </div>
        </GridSection>

        {/* Section Two */}
        <GridSection gridTemplateColumns="12">
          <div className="md:col-span-4">
            <DoughnutPieChart statistics={statistics} />
          </div>
          <div className="md:col-span-8">
            <RevenueChart statistics={statistics} />
          </div>
        </GridSection>

        {/* Section Three */}
        <GridSection gridTemplateColumns="12">
          <div className="col-span-12 md:col-span-6">
            <TopSellingProducts statistics={statistics} />
          </div>
          <div className="col-span-12 md:col-span-6">
            <LowStockProducts statistics={statistics} />
          </div>
        </GridSection>
      </div>
    </>
  );
}
