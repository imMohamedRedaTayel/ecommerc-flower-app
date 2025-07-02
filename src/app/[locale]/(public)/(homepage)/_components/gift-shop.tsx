"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";

export default function GiftShop() {
  // Translation
  const t = useTranslations();

  // Variables
  const cards = [
    {
      src: "/images/slider2.png",
      title: "gifts-box",
      subtitle: "awesome-gifts",
      btn: "shop-now",
    },
    {
      src: "/images/slider3.png",
      title: "occasions-gifts",
      subtitle: "best-occasions",
      btn: "discover-now",
    },
    {
      src: "/images/slider4.png",
      title: "occasions",
      subtitle: "combo-sets",
      btn: "discover-now",
    },
  ];

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 container">
      {cards.map((item) => (
        <li key={item.title} className="relative rounded-2xl overflow-hidden aspect-[5/3]">
          {/* Background */}
          <Image src={item.src} alt={item.title} fill className="object-cover" />

          {/* Content */}
          <div className="p-6 flex flex-col justify-center h-full items-end gap-3 z-10 relative">
            {/* Title */}
            <h3
              className={cn(
                "font-medium",
                item.title === "occasions" ? "text-white" : "text-pink-800",
              )}
            >
              {t(item.title)}
            </h3>

            {/* Headline */}
            <h2 className="text-xl text-[#160E4B] font-semibold max-w-[70%] text-end">
              {t(item.subtitle)}
            </h2>

            {/* Action */}
            <button className="mt-8 px-4 py-2 bg-[#F82BA9] text-white rounded-full hover:bg-pink-600 transition">
              {t(item.btn)}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
