"use client";

import { FaStar } from "react-icons/fa6";
import { FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { useFormatter, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useSession } from "next-auth/react";
import { addProductToCart } from "@/lib/actions/cart/cart.actions";
import { toast } from "sonner";
import { AuthDialog } from "../auth/auth-dailog";

export default function ProductItem({ product }: { product: Product }) {
  console.log(product, "product");

  // Translation
  const t = useTranslations();
  const format = useFormatter();

  // Navigation
  const router = useRouter();

  // Variables
  const { data: session } = useSession();

  const handleAddToCart = async () => {
    if (product.quantity <= 0) return;

    try {
      await addProductToCart(product._id, 1);
      toast.success(t("added"));
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || t("something-went-wrong"));
    }
  };

  return (
    <div className="w-full max-w-sm">
      {/* Card Img */}
      <div className="aspect-[4/3] overflow-hidden relative rounded-2xl group">
        <Image
          src={product.imgCover}
          alt="product"
          className="object-cover w-full h-full"
          fill
        />

        {/* Overlay with icons */}
        <div className="absolute inset-0 bg-pink-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-4">
            {/* View */}
            <Link href={`/products/${product._id}`} className="text-white bg-pink-900 w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-pink-900">
              <IoEyeOutline size={"20"} />
            </Link>

            {/* Add to favourite */}
            <Button className="text-white bg-pink-900 w-[40px] h-[40px] rounded-full hover:bg-pink-900">
              <FaRegHeart size={"20"} />
            </Button>
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="mt-4">
        {/* Product Title */}
        <Link href={`/products/${product._id}`} className="font-bold text-base leading-[20.4px] line-clamp-1 hover:underline">
          {product.title}
        </Link>

        {/* Product Icons */}
        <div className="flex items-center justify-between">
          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => {
              const rating = product.rateAvg;
              if (index < Math.floor(rating)) {
                return <FaStar key={index} className="text-yellow-500" />;
              } else if (index < rating) {
                return (
                  <FaStarHalfAlt key={index} className="text-yellow-500" />
                );
              } else {
                return <FaRegStar key={index} className="text-yellow-500" />;
              }
            })}
          </div>

          {/* Add to cart */}

          {session ? (
            <Button onClick={handleAddToCart} className="size-[42px] rounded-full bg-violet-900 pt-[11px] pe-[13px] pb-3 ps-[13px]  flex items-center justify-center">
              <IoBagOutline className="text-white" size={"20"} />
            </Button>
          ) : (
            <AuthDialog>
              <div className="bg-violet-900 text-white rounded-full p-3">
                <IoBagOutline />
              </div>
            </AuthDialog>
          )}
        </div>

        {/* Product Price */}
        <div className="mt-2 flex items-center gap-2">
          <p className="text-fairy-rose font-bold text-sm">
            {format.number(
              product.priceAfterDiscount || product.price,
              "currency-full"
            )}
          </p>

          {product.priceAfterDiscount && (
            <p className="text-gray-shade-150 line-through text-xs">
              {format.number(product.price, "currency-full")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
