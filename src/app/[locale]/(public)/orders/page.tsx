import { getTranslations } from "next-intl/server";
import AllOrders from "./_components/all-orders";
import { Suspense } from "react";
import OrdersSkeleton from "@/components/common/skeletons/orders/orders.skeleton";
import { getUserOrders } from "@/lib/apis/orders.api";

export default async function Page() {
  // Translations
  const t = await getTranslations();

  // Variables
  const orders = await getUserOrders();

  // console.log(orders , 'orders');
  

  // Empty State
  if (!orders) {
    return (
      <div className="container mx-auto py-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-Center text-storm-900">{t("no-orders")}!</h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-8 min-h-screen ">
      <Suspense fallback={<OrdersSkeleton />}>
        <AllOrders orders={orders?.orders} />
      </Suspense>
    </div>
  );
}
