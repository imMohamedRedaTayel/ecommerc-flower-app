"use client";

import OrderItem from "./order-item";

interface AllOrdersProps {
  orders: Order[];
}

export default function AllOrders({ orders }: AllOrdersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      
      {orders?.map((order) => (
        <OrderItem key={order?._id} order={order} />
      ))}
    </div>
  );
}
