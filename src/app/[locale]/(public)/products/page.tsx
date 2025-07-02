import React, { Suspense } from "react";
import ProductSkeleton from "@/components/common/skeletons/product-skeleton";
import { normalizeSearchParams } from "@/lib/utils/search-params";
import { FilterSkeleton } from "@/components/common/skeletons/_components/filter";
import { CategoryFilter } from "@/components/features/product/category-filter";
import { OccasionsFilter } from "@/components/features/product/occasions-filter";
import { PriceFilter } from "@/components/features/product/price-filter";
import StatusFilter from "./_components/filters/status-filter";
import RatingFilter from "./_components/filters/rating-filter";
import AllProducts from "./_components/products/all-products";


export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = normalizeSearchParams(searchParams);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Filter Section */}
      <div className="md:col-span-1 p-4 border-b md:border-b-0 md:border-r border-gray-300">
        <Suspense fallback={<FilterSkeleton />}>
          <CategoryFilter />
          <OccasionsFilter />
          <PriceFilter />
          <StatusFilter />
          <RatingFilter />
        </Suspense>
      </div>

      {/* Product List Section */}
      <div className="  md:col-span-3  p-4">
        <Suspense fallback={<ProductSkeletonGrid />}>
          <AllProducts searchParams={search} />
        </Suspense>
      </div>
    </div>
  );
}

function ProductSkeletonGrid() {
  return (
    <div className="grid grid-cols sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(8)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
