import { Card } from "@/components/ui/card";
import { useFormatter, useTranslations } from "next-intl";
import { BsBoxSeam } from "react-icons/bs";
import { LuReceiptText, LuClipboardList, LuCircleDollarSign } from "react-icons/lu";

export default function StatisticsCards({ statistics }: Statistics) {
  const { totalProducts, totalOrders, totalCategories, totalRevenue } = statistics?.overall;

  // Translations
  const t = useTranslations();
  const format = useFormatter();

  return (
    <Card className="p-6 border-none h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Products card */}
        <div className="bg-pink-50 p-4 rounded-lg">
          <div className="flex-col text-pink-900 font-semibold text-2xl">
            <BsBoxSeam className="mb-3" />
            <span className="font-medium">{format.number(totalProducts)}</span>
          </div>
          <span className="font-medium">{t("total-products")}</span>
        </div>

        {/* Orders card */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex-col text-blue-900 font-semibold text-2xl">
            <LuReceiptText className="mb-3" />
            <span className="font-medium">{format.number(totalOrders)}</span>
          </div>
          <span className="font-medium">{t("total-orders")}</span>
        </div>

        {/* Categories card */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex-col text-purple-900 font-semibold text-2xl">
            <LuClipboardList className="mb-3" />
            <span className="font-medium">{format.number(totalCategories)}</span>
          </div>
          <span className="font-medium">{t("total-categories")}</span>
        </div>

        {/* Revenue card */}
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex-col text-green-900 font-semibold text-2xl">
            <LuCircleDollarSign className="mb-3" />
            {format.number(totalRevenue, "currency-full")}
          </div>
          <span className="font-medium">{t("total-revenue")}</span>
        </div>
      </div>
    </Card>
  );
}
