"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

interface OrderItemProps {
  order: Order;
}

export default function OrderItem({ order }: OrderItemProps) {
  // Translations
  const t = useTranslations();

  type OrderState = "inProgress" | "completed" | "pending" | "cancelled";

  // Formats a date string to a human-readable format
  function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Maps order states to appropriate UI variants
  function getStateVariant(state: OrderState) {
    switch (state) {
      case "inProgress":
        return "outline";
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  }

  function translateState(state: OrderState) {
    return t(state);
  }

  function isOrderState(state: string): state is OrderState {
    return ["inProgress", "completed", "pending", "cancelled"].includes(state);
  }

  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <CardTitle className="text-pink-700">
            {t("order-number")}: {order.orderNumber}
          </CardTitle>
          <div className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</div>

          {/* Order State Badge */}
          <Badge
            variant={isOrderState(order.state) ? getStateVariant(order.state) : "secondary"}
            className="w-fit capitalize"
          >
            {isOrderState(order.state) ? translateState(order.state) : t("unknown")}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Order Items */}
        {order.orderItems.map((item) => (
          <div key={item._id} className="flex gap-4 items-center">
            <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
              <Image
                src={item.product.imgCover}
                alt={item.product.title}
                className="w-16 h-16 rounded-md object-cover"
                loading="lazy"
              />
            </Link>
            <div className="flex-1 space-y-1">
              <Link
                href={`/products/${item.product.slug}`}
                className="font-medium text-pink-800 hover:underline"
              >
                {item.product.title}
              </Link>
              <div className="text-sm text-muted-foreground">
                {t("quantity")} : {item.quantity} × {item.price} EGP
              </div>
              <div className="text-sm font-semibold">
                {t("total-price")}: {item.quantity * item.price} EGP
              </div>
            </div>
          </div>
        ))}

        <Separator className="my-2" />

        {/* Order Summary */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("payment")} :</span>
            <span className="font-medium">
              {order.paymentType === "cash" ? t("COD") : t("paid")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("payment-status")} :</span>
            <span className="font-medium">{order.isPaid ? t("paid") : t("not-paid")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("delivery-status")} :</span>
            <span className="font-medium">
              {order.isDelivered ? t("delivered") : t("not-delivered")}
            </span>
          </div>
          <div className="flex justify-between font-bold text-pink-900">
            <span>{t("total-price")}:</span>
            <span>{order.totalPrice} EGP</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2 mt-4">
          <Link href="/products" className="flex-1">
            <Button variant="outline" className="w-full">
              {t("continue-shopping")}
            </Button>
          </Link>
          <Link href="/cart" className="flex-1">
            <Button className="w-full">{t("view-cart")}</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
