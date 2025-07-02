"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import Headline from "@/components/common/headline";

export default function Gallery() {
  // Translation
  const t = useTranslations();

  // Variables
  const gallaries = [
    { name: "Coconut", logo: "/assets/images/gallary/frame1.png" },
    { name: "BruAsua", logo: "/assets/images/gallary/frame2.png" },
    { name: "Yudonge", logo: "/assets/images/gallary/frame3.jpeg" },
    { name: "Conboard", logo: "/assets/images/gallary/frame4.png" },
    { name: "Agyaq", logo: "/assets/images/gallary/frame5.png" },
  ];

  return (
    <div className="mt-16 container mx-auto  gap-10">
    {/* Title */}
    <h2 className="text-lg text-pink-900 font-bold text-center mb-3 tracking-[0.3em]">
      {t("ourGallery")}
    </h2>
  
    {/* Headline */}
    <Headline>{t("photo-gallery")}</Headline>
  
    {/* Gallery Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {gallaries.map((gallary, index) => (
        <div
          key={index}
          className={cn(
            "overflow-hidden rounded-[40px] transform transition-transform duration-300 hover:scale-105",
            index === 3 && "md:col-span-2" // فقط من md وطالع
          )}
        >
          <Image
            src={gallary.logo}
            alt={gallary.name}
            width={400}
            height={0}
            className="w-full aspect-[4/3] object-cover h-full " // responsive بدل h-[411px]
          />
        </div>
      ))}
    </div>
  </div>
  
  );
}
