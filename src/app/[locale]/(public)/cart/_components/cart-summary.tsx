"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { CURRENCY } from "@/lib/constants/common";
import { useFormatter, useTranslations } from "next-intl";
import { FaArrowRightLong } from "react-icons/fa6";

type CartSummaryProps = {
  summary: {
    subtotal: number;
    discount: number;
    total: number;
    shipping: string | number;
    taxes: number;
  };
  cartItemsLength: number;
};

export default function CartSummary({ summary, cartItemsLength }: CartSummaryProps) {
  // Translation
  const t = useTranslations();
  const format = useFormatter();

  // Navigation
  const router = useRouter();

  return (
    <div className="col-span-3 rounded-[20px] h-full p-10 max-h-[415px] bg-pink-50 ">
      {/* Title */}
      <h2 className="text-storm-900 font-inter font-bold text-lg">{t("cart-summary")}</h2>

      {/* Summary list */}
      <ul className="flex flex-col gap-5 my-6">
        {/* Subtotal */}
        <li className="flex justify-between items-center">
          <strong className="text-storm-900 font-roboto">{t("subtotal")} :</strong>
          <span className="text-storm-500 font-roboto">
            {format.number(summary.subtotal || 0, {
              style: "currency",
              currency: CURRENCY,
              maximumFractionDigits: 0,
            })}
          </span>
        </li>

        {/* Discount */}
        <li className="flex justify-between items-center">
          <strong className="text-storm-900 font-roboto"> {t('discount-0')} :</strong>
          <span className="text-storm-500 font-roboto">
            {summary.discount !== 0
              ? format.number(summary.discount / 100 || 0, {
                  style: "percent",
                })
              : t("no-discount")}
          </span>
        </li>

        {/* Shipping */}
        <li className="flex justify-between items-center">
          <strong className="text-storm-900 font-roboto">{t("shipping")} :</strong>
          <span className="text-storm-500 font-roboto">
            {typeof summary.shipping === "number"
              ? format.number(summary.shipping || 0, { style: "currency", currency: CURRENCY, })
              : t("free-shipping")}
          </span>
        </li>

        {/* Taxes */}
        <li className="flex justify-between items-center">
          <strong className="text-storm-900 font-roboto">{t("taxes")} :</strong>
          <span className="text-storm-500 font-roboto">
            {format.number(summary.taxes || 0, { style: "currency", currency: CURRENCY,  maximumFractionDigits: 0, })}
          </span>
        </li>
      </ul>

      {/* Total */}
      <div className="flex justify-between items-center mt-8">
        <strong className="text-storm-900 font-roboto">{t("total")}:</strong>
        <strong className="text-pink-900 font-roboto">
          {format.number(summary.total || 0, { style: "currency", currency: CURRENCY,  maximumFractionDigits: 0, })}
        </strong>
      </div>

      {/* Checkout button */}
      <div className="w-full flex justify-center mt-8">
        <Button
          onClick={() => router.push("/checkout")}
          disabled={cartItemsLength === 0}
          className={`bg-pink-900 hover:bg-pink-600 ms-auto
          ${cartItemsLength === 0 && "bg-pink-600"}`}
        >
          {t("checkout-now")}
          <FaArrowRightLong className="rtl:rotate-180" />
        </Button>
      </div>
    </div>
  );
}
