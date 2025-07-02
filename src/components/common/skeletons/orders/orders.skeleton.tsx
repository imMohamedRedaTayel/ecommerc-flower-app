import OrderItemSkeleton from "./order-item.skeleton";

export default function OrdersSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <OrderItemSkeleton key={i} />
      ))}
    </div>
  );
}
