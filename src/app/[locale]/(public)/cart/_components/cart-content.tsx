import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Loader2 } from "lucide-react";
import CartSummary from "./cart-summary";
import CartTable from "./cart-table";
import EmptyCartFallback from "./empty-cart-fallback";
import ContinueShoppingButton from "./continue-shopping-button";

export default async function CartContent({ data }: { data: Cart }) {
  // Translation
  const t = await getTranslations();

  // Variables
  const cartItems = data?.cartItems || [];

  const cartSummary = {
    subtotal: data?.totalPrice || 0,
    discount: data?.discount,
    total: data?.totalPriceAfterDiscount || 0,
    shipping: t("free-shipping"),
    taxes: 0,
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-9 h-full ">
        <div className="h-full flex flex-col justify-between ">
          <Suspense fallback={<Loader2 className="animate-spin text-pink-900" />}>
            {cartItems?.length === 0 ? (
              // If cart is empty
              <EmptyCartFallback />
            ) : (
              // Items table
              <CartTable cartItems={cartItems} />
            )}
          </Suspense>

          {/* Countinue shopping button */}
          <ContinueShoppingButton />
        </div>
      </div>

      {/* Cart summary component */}
      <CartSummary summary={cartSummary} cartItemsLength={cartItems?.length} />
    </div>
  );
}
