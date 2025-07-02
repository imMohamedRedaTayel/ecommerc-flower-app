import ProductItem from "@/components/features/product/product-item";
import { Link } from "@/i18n/routing";
import { MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function RelatedProducts({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  // Translation
  const t = useTranslations();

  return (
    <div className="space-y-14">
      <div className="flex justify-between items-center relative">
        <h3 className="text-3xl font-semibold text-storm-900 z-10">{t("related-items")}</h3>
        <div className="absolute h-7 w-44 top-4 rounded-e-full bg-pink-100"></div>
        {/* View More Button */}
        <Link
          href={`/products?category=${product.category}`}
          className="text-sm text-gray-shade-50 hover:text-gray-shade-100 flex items-center gap-1"
        >
          {t("viewMore")} <MoveRight />
        </Link>
      </div>

      {/* Related product */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {relatedProducts.map((relatedProduct , index) => (
            <ProductItem key={index} product={relatedProduct} />
        ))}
      </div>
    </div>
  );
}
