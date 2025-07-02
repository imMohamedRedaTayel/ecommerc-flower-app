import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "@/components/common/arrow";
import fetchProducts from "@/lib/apis/product.api";
import ProductItem from "@/components/features/product/product-item";

export default async function BestSeller() {
  // Translations
  const t = await getTranslations();

  // Fetch data
  const payload = await fetchProducts({ sort: "-sold" });
  const products = payload?.products;

  return (
    <section className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-6 mb-[80px]">
      {/* Premium Gifts */}
      <div>
        {/* Heading */}
        <h3 className="uppercase text-pink-900 font-bold tracking-[4px] mb-[28.7px] text-base">
          {t("premium_gifts")}
        </h3>

        {/* Sub Heading */}
        <h2 className="font-bold text-3xl mb-2 text-storm-900 leading-[40.8px]">
          {t.rich("best-selling-headline", {
            span: (v) => <span className="text-pink-900">{v}</span>,
          })}
        </h2>

        {/* Description */}
        <p className="mb-[28.7px] line-clamp-4 text-storm-500 leading-[28.8px]">
          {t("description")}
        </p>

        {/* Explore */}
        <Button className="bg-pink-900 rounded-[10px] p-2.5 w-40 h-[49px] mb-6">
          {t("explore")}
          <ArrowRight size={18} strokeWidth={2.5} />
        </Button>
      </div>

      {/* Slider */}
      <div className="col-span-3">
        {/* Carousel */}
        <Carousel>
          {/* Carousel Content */}
          <CarouselContent>
            {/* Carousel Cards */}
            {products?.map((product) => (
              <CarouselItem key={product._id} className="basis-full sm:basis-1/2 lg:basis-1/3 ">
                <ProductItem product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Prev */}
          <CarouselPrevious className="bg-pink-900 text-white font-bold rounded-full left-1 rtl:left-auto rtl:right-0 top-1/3 mt-4" />

          {/* Carousel Next */}
          <CarouselNext className="bg-pink-900 text-white font-bold  rounded-full right-1 rtl:right-auto rtl:left-0 top-1/3 mt-4" />
        </Carousel>
      </div>
    </section>
  );
}
