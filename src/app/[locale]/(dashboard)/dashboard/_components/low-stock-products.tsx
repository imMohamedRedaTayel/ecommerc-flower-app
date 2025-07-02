import Headline from "@/components/common/(dashboard)/headline";
import { Card } from "@/components/ui/card";
import { useFormatter, useTranslations } from "next-intl";
import React from "react";


export default function LowStockProducts({ statistics }: Statistics) {
  // Translations
  const t = useTranslations();

  // Varibales
  const format = useFormatter();
  const products = (statistics?.products.lowStockProducts ?? [])
    .slice()
    .sort((a, b) => a.quantity - b.quantity);

  return (
    <Card className="p-6 border-none h-full">
      {/* Head Line */}
      <Headline> {t("low-stock-products")} </Headline>

      {/* Low Stock Products */}
      {products.map((product) => (
        <div
          key={product._id}
          className={"flex items-center justify-between p-2 rounded-sm shadow-sm mb-3 "}
        >
          <p className="font-semibold text-base">{product.title.slice().split("2", 2).join("")}</p>
          <p
            className={`text-sm md:text-base font-medium ${
              product.quantity < 5 ? "text-red-700" : "text-black"
            }`}
          >
            {format.number(product.quantity)} {t("products")}
          </p>
        </div>
      ))}
    </Card>
  );
}
