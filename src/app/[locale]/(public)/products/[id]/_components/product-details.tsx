"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useFormatter, useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { addProductToCart } from "@/lib/actions/cart/cart.actions";
import { AuthDialog } from "@/components/features/auth/auth-dailog";
import ProductCarousel from "./product-caraousel";

export default function ProductDetails({ product }: { product: Product }) {
  // Translation
  const t = useTranslations();
  const format = useFormatter();
  // States
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Navigation
  const router = useRouter();

  // Session
  const { data: session } = useSession();

  // Function
  const handleAddToCart = async () => {
    if (product.quantity <= 0) return;

    setLoading(true);
    try {
      await addProductToCart(product._id, quantity);
      toast.success(t("added"));
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || t("something-went-wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 ">
      {/* Carousel */}
      <div className="w-full md:w-4/12">
        <ProductCarousel images={product.images} />
      </div>

      {/* Product details */}
      <div className="w-full md:w-8/12 space-y-4">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-storm-900">
          {product.title}
        </h2>
        {/* Price */}
        <div className="flex items-center space-x-4">
          {product.priceAfterDiscount < product.price ? (
            <>
              <p className="line-through text-gray-500 text-lg">
                {format.number(product.price, "currency-full")}{" "}
              </p>
              <p className="text-2xl text-pink-900  ">
                {format.number(product.priceAfterDiscount, "currency-full")}
                <span className="text-sm text-fairy-rose px-3 ">
                  {format.number(product.discount ?? 0, "percentage")}{" "}
                  {t("off")}
                </span>
              </p>
            </>
          ) : (
            <p className="text-2xl text-pink-900">
              {" "}
              {format.number(product.price, "currency-full")}{" "}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-storm-500">{product.description}</p>

        {/* Quantity */}
        <div className="space-y-2">
          <p className="text-lg text-storm-500">{t("quantity")}:</p>
          <div className="flex items-center">
            <Button
              type="button"
              className=" rounded-full w-[40px] h-[40px] bg-pink-400 hover:bg-pink-600 text-xl"
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              disabled={loading || product.quantity <= 0 || quantity <= 1}
            >
              -
            </Button>
            <span className="px-4 py-2 text-pink-900">{quantity}</span>
            <Button
              type="button"
              className=" rounded-full w-[40px] h-[40px] bg-pink-400 hover:bg-pink-600 text-xl"
              onClick={() =>
                setQuantity((prev) => Math.min(prev + 1, product.quantity))
              }
              disabled={
                loading || product.quantity <= 0 || quantity >= product.quantity
              }
            >
              +
            </Button>
          </div>
        </div>

        {/* Stock */}
        <div className="flex items-center space-x-2">
          <p className="text-lg">{t("stock")}:</p>
          <p
            className={`text-base ${
              product.quantity > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.quantity > 0 ? t("inStock") : t("outOfStock")}
          </p>
        </div>

        {/* Add to cart button */}
        {session ? (
          <Button
            onClick={handleAddToCart}
            disabled={loading || product.quantity <= 0}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            {loading ? t("adding") : t("addToCart")}
          </Button>
        ) : (
          <AuthDialog>
            <div className="bg-pink-500 hover:bg-pink-600 h-10 px-4 py-2 rounded-md text-white">
              {t("addToCart")}
            </div>
          </AuthDialog>
        )}
      </div>
    </div>
  );
}
