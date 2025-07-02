"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface CategoriesProps {
  categories?: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  // Transition
  const t = useTranslations();

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      className=" container "
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {categories?.map((category) => (
          <CarouselItem
            key={category._id}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
          >
            {/* Card */}
            <Link
              href={`/categories/${category._id}`}
              className="bg-pink-50 rounded-3xl p-4 h-full flex items-center gap-4"
            >
              {/* Image */}
              <div className="rounded-full bg-pink-900 flex items-center justify-center p-4">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={50}
                  height={50}
                  className="filter invert brightness-0 sepia hue-rotate-180"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col">
                {/* Name */}
                <span className="text-sm font-semibold text-gray-800 capitalize">
                  {category.name}
                </span>

                {/* Products */}
                <p className="text-sm text-gray-600">
                  {category.productsCount} {t("items", { default: "items" })}
                </p>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
