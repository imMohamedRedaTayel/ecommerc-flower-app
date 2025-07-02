"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { CarouselApi } from "@/components/ui/carousel";

interface ProductCarouselProps {
  images: string[];
}

export default function ProductCarousel({ images }: ProductCarouselProps) {
  // State
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (api) {
      const handleSelect = () => {
        setSelectedIndex(api.selectedScrollSnap());
      };

      api.on("select", handleSelect);

      return () => {
        api.off("select", handleSelect);
      };
    }
  }, [api]);

  if (images.length <= 1) return null;

  const handleThumbnailClick = (index: number) => {
    api?.scrollTo(index);
    setSelectedIndex(index);
  };

  return (
    <div className="max-w-md">
      {/* Main product view */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-4 p-4">
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full aspect-square"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="flex justify-center items-center">
                <div className="h-full w-full flex items-center justify-center p-2">
                  <Image
                    src={image}
                    alt={image || `Image ${index + 1}`}
                    width={500}
                    height={500}
                    className="object-contain max-h-[500px]"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Thumbnails */}
      <div className="flex justify-start gap-3 w-full overflow-x-hidden  py-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "w-1/3 h-[100px] rounded-xl transition-all duration-200 overflow-hidden border",
              selectedIndex === index
                ? "border-[1.5px] border-custom-rose-900 shadow-sm"
                : "border border-gray-200 opacity-80 hover:opacity-100"
            )}
            aria-label={`View ${index} thumbnail`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
