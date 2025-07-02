import { getTranslations } from "next-intl/server";

import fetchProducts from "@/lib/apis/product.api";
import ProductItem from "@/components/features/product/product-item";
import ProductPagination from "./products-pagination";

export default async function AllProducts({ searchParams }: { searchParams: URLSearchParams }) {
  // Translations
  const t = await getTranslations();

  const products = await fetchProducts(searchParams ?? {});

  if (!products?.products.length) {
    return (
      <div className="text-pink-900 text-3xl capitalize text-center flex items-center justify-center h-full">
        {t("no-products")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {/* Products List */}
      {products.products.map((product: Product) => (
        <ProductItem key={product._id} product={product} />
      ))}
      {/* Pagination */}
      <ProductPagination
        totalItems={products.metadata.totalItems}
        currentPage={products.metadata.currentPage}
      />
    </div>
  );
}
