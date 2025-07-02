import Headline from "@/components/common/(dashboard)/headline";
import { Card } from "@/components/ui/card";
import { useFormatter, useTranslations } from "next-intl";
import React from "react";


export default function TopSellingProducts({ statistics }: Statistics) {
  // Translations
  const t = useTranslations();

  // Varibales
  const format = useFormatter();
  const products = statistics?.products.topSellingProducts ?? [];
  const gradientClasses = ["bg-gold-gradient", "bg-gray-gradient", "bg-chocolate-gradient"];

  return (
    <Card className="p-6 border-none h-full ">
      {/* Head Line */}
      <Headline> {t("top-selling-products")} </Headline>

      {/* Top Selling Products */}
      {products.map((product, index: number) => (
        <div
          key={product._id}
          className={`flex items-center justify-between p-2 rounded-sm shadow-sm mb-3 ${
            gradientClasses[index] ?? "bg-gray-shade-300"
          }`}
        >
          <div className="flex items-center gap-x-2">
            <p className="font-semibold text-base">
              {product.title.includes("|")
                ? product.title.split("|")[0].trim() +
                  " | " +
                  product.title.split("|")[1]?.trim().slice(0, 1) +
                  "..."
                : product.title}
            </p>
            <p className="text-xs ">({format.number(product.price, "currency-full")})</p>
          </div>
          <p className="text-sm md:text-base text-gray-700 font-medium">
            {format.number(product.sold)} {t("sales")}
          </p>
        </div>
      ))}
    </Card>
  );
}
