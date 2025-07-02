import fetchProducts, { fetchProductDetails } from "@/lib/apis/product.api";
import { getTranslations } from "next-intl/server";
import ProductDetails from "./_components/product-details";
import RelatedProducts from "./_components/related-products";

export default async function Page({ params }: { params: { id: string } }) {
  // Translation
  const t = await getTranslations();

  // Query params
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // Fetch data
  const payload = await fetchProductDetails(id);
  if (!payload || !payload.product) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-red-500 text-lg">{t("product-not-found")}</p>
      </div>
    );
  }
  const product = payload.product;

  // Fetch related products based on category
  const relatedPayload = await fetchProducts({ category: product.category, limit: 5 });
  const relatedProducts = relatedPayload?.products?.filter((p) => p._id !== product._id);

  return (
    <div className=" container mx-auto ">
      {/* Product Details Section */}
      <ProductDetails product={product} />

      {/* Related Products Section */}
      <div className="my-16">
        {relatedProducts && relatedProducts.length > 0 && (
          <RelatedProducts product={product} relatedProducts={relatedProducts} />
        )}
      </div>
    </div>
  );
}
