import ProductItem from "@/components/features/product/product-item";
import { Link } from "@/i18n/routing";
import fetchProducts from "@/lib/apis/product.api";
import { cn } from "@/lib/utils/cn";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function PopularProducts({
  categories,
  currentCategory,
  searchParams,
}: {
  searchParams: { [key: string]: string };
  categories: Category[];
  currentCategory: string;
}) {

  // Translations
  const t = await getTranslations();

  // Variables
  const payload = await fetchProducts(searchParams);
  const products = payload?.products;  

  return (
    <section className="container mb-[80px]">
      {/* Navigation */}
      <nav className=" block md:flex justify-between items-center mb-[40px]">
        {/* Heading */}
        <h3 className="font-bold text-3xl relative after:content-[''] after:block after:w-[53px] after:h-[2px] after:bg-pink-900 before:content-[''] before:w-[140px] before:h-[20px] before:bg-pink-50 before:rounded-full before:block before:absolute before:top-1/2 before:left-0 before:-z-20">
          {t("popular_items")}
        </h3>

        {/* Category Links */}
        <div className="flex gap-6 my-4 ">
          {categories?.slice(0, 4).map((category) => (
            <Link
              className={cn(
                "text-lg active:text-pink-900 active:underline capitalize underline-offset-1",
                currentCategory === category._id &&
                  "text-pink-900 underline capitalize"
              )}
              key={category._id}
              href={`?category=${category._id}`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Popular Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => <ProductItem key={product._id} product={product} />)}
      </div>
    </section>
  );
}
