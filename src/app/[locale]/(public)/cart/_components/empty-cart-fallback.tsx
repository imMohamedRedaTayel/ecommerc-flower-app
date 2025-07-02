
import { useTranslations } from "next-intl";
import Image from "next/image";

/**
 * Fallback component if cart is empty
 */ 

export default function EmptyCartFallback() {
  // Translation
  const t = useTranslations();

  return (
    <div className="h-[400px] flex justify-center items-center flex-col gap-6">
      <Image
        src={"/assets/images/cart/empty-cart.png"}
        alt="Empty cart"
        width={200}
        height={200}
        className=""
      />
      <p className="text-storm-500 text-xl font-roboto">{t("cart-is-empty")}</p>
    </div>
  );
}
