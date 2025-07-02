"use client";

import { useState, useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";

interface GalleryCarouselDialogProps {
  images: string[];
}

export function GalleryCarouselDialog({ images }: GalleryCarouselDialogProps) {
  // Translation
  const t = useTranslations();
  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel();

  // State
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handlers
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{t("open-gallery")}</Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl p-8 rounded-2xl">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {/* Images */}
            {images.map((src, index) => (
              <div key={index} className="min-w-full flex justify-center items-center p-4">
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  width={600}
                  height={400}
                  className="rounded-xl object-contain max-h-[60vh]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination and Navigation */}
        <div className="flex items-center justify-between mt-4">
          {/* Pagination */}
          <div className="flex gap-2">
            {images.map((value, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === selectedIndex ? "bg-pink-900" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <Button
              onClick={scrollPrev}
              className="w-8 h-8 rounded-full bg-white border border-pink-500 flex items-center justify-center text-pink-900 hover:bg-pink-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              onClick={scrollNext}
              className="w-8 h-8 rounded-full border bg-white border-pink-500 flex items-center justify-center text-pink-900 hover:bg-pink-100"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}