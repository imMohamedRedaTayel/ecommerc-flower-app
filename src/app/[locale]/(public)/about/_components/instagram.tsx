import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Instagram() {
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
    <section className="container mx-auto my-[80px]">
      <div className="flex flex-col items-center justify-center">
        {/* Heading */}
        <h3 className="font-bold text-3xl relative after:content-[''] after:block after:w-[53px] after:h-[2px] after:bg-pink-900 before:content-[''] before:w-[140px] before:h-[20px] before:bg-pink-50 before:rounded-full before:block before:absolute before:top-1/2 before:left-0 before:-z-20">
          {t.rich("instagram-heading", {
            span: (v) => <span className="text-pink-900 font-alex font-normal ">{v}</span>,
          })}
        </h3>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mt-10">
        {gallaries.map((gallary, index) => (
          <div key={index} className="w-full aspect-square relative">
            <Image src={gallary.logo} alt={gallary.name} fill className="object-cover rounded-xl" />
          </div>
        ))}
      </div>
    </section>
  );
}
