"use client";

import { FaArrowRight } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPagination,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function BestShop() {
  // Translations
  const t = useTranslations();

  // Variables
  const sliderImages = [
    "/images/slider.png",
    "/images/slider2.png",
    "/images/slider3.png",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-y-3 gap-0 md:gap-6 my-6 container h-auto md:h-[440px]">
      {/* Left card */}
      <div className="col-span-2 rounded-2xl overflow-hidden relative flex flex-col justify-end items-start gap-3 p-6">
        {/* Gift */}
        <Image
          src="/images/gift.png"
          alt="Special Gift Box"
          fill
          sizes="400px"
          className="object-cover"
        />

        {/* Title */}
        <span className="z-10 tracking-[0.3em] relative text-pink-900 font-bold uppercase">
          {t("start-from")}
        </span>

        {/* Headline */}
        <h4 className="z-10 relative text-indigo-950 text-2xl font-semibold leading-tight">
          {t("special-gifts")}
        </h4>

        {/* Action */}
        <button className="z-10 relative bg-pink-900 text-white px-4 py-3 mt-3 rounded-xl flex items-center gap-2 hover:bg-pink-700 transition">
          {t("shop-now")}
          <FaArrowRight className="w-4 rtl:-scale-x-100" />
        </button>
      </div>

      {/* Carousel */}
      <Carousel className="md:col-span-6 relative h-[300px] md:h-[440px]">
        <CarouselContent className="-ml-0">
          {sliderImages.map((image, index) => (
            <CarouselItem
              key={index}
              className="pl-0 w-full h-[300px] md:h-[441px] relative rounded-2xl overflow-hidden"
            >
              {/* SlideImg */}
              <Image
                src={image}
                alt={`slider-${index}`}
                fill
                sizes="(min-height: 1024px) 70vw, 100vw"
                className="object-cover"
              />

              <div className="p-12 flex flex-col items-start gap-6 z-10 relative">
                {/* Title */}
                <span className="text-pink-800 font-bold text-xl tracking-[0.3em] uppercase">
                  {t("best-gift-shop")}
                </span>

                {/* Headline */}
                <h4 className="text-5xl leading-tight font-bold w-3/5 text-[#160E4B]">
                  {t("choose-perfect")}
                  <span className="text-pink-800"> {t("gifts")} </span>
                  {t("from-us")}
                </h4>

                {/* Description */}
                <p className="w-1/2 text-lg leading-7 text-[#160E4B]">
                  {t("description-one")}
                </p>

                {/* Action */}
                <button className="bg-pink-900 text-white px-5 py-3 rounded-xl flex items-center gap-3 hover:bg-pink-600 transition-all">
                  <span className="text-lg">{t("shop-now")}</span>
                  <FaArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation */}
        <div className="absolute bottom-12 right-20 rtl:right-auto rtl:left-20 -translate-x-1/2 flex gap-3 z-10 rtl:flex-row-reverse">
          {/* Prev */}
          <CarouselPrevious className="bg-white/90 text-gray-800 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition-all" />

          {/* Next */}
          <CarouselNext className="bg-white/90 text-gray-800 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition-all" />
        </div>

        {/* Pagination */}
        <CarouselPagination
          buttonProps={{
            className: "bg-pink-900 size-2.5",
            activeClassName: "w-6",
          }}
        />
      </Carousel>
    </div>
  );
}
