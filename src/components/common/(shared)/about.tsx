import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/common/arrow";
import { useTranslations } from "next-intl";

export default function About() {
  /* Translations */
  const t = useTranslations();

  return (
    <section className="container flex flex-col lg:flex-row gap-10 lg:gap-20 my-[80px]">
      {/* Images */}
      <div className="flex justify-center items-center lg:items-start flex-col lg:flex-row">
        {/* Image One */}
        <div className="relative w-[302px] h-[344px] mb-4 lg:mb-0">
          {/* Styles moved for brevity */}
          <div className="relative before:absolute before:-left-5 rtl:before:left-auto rtl:before:-right-5 before:bottom-0 before:w-11/12 before:h-[calc(100%+1rem)] rtl:before:-rotate-[3.09deg] before:rotate-[3.09deg] before:border-4 before:border-pink-900 before:rounded-tl-[50px] before:rounded-bl-[120px] before:rounded-br-[120px] before:rounded-tr-[120px] h-full w-full rounded-tl-[50px] rounded-bl-[120px] rounded-br-[120px] rounded-tr-[120px] rtl:before:rounded-tr-[50px] rtl:before:rounded-br-[120px] rtl:before:rounded-bl-[120px] rtl:before:rounded-tl-[120px]">
            <Image
              src="/assets/images/pic1.png"
              alt="pic"
              width={302}
              height={344}
              className="object-cover w-full h-full rounded-tl-[50px] rounded-bl-[120px] rounded-br-[120px] rounded-tr-[120px] rtl:rounded-tr-[50px] rtl:rounded-br-[120px] rtl:rounded-bl-[120px] rtl:rounded-tl-[120px]"
            />
          </div>
        </div>

        {/* Images Two */}
        <div className="ms-0 lg:ms-[8px] flex flex-row lg:flex-col gap-2">
          <div className="w-[120px] lg:w-[193px] h-[120px] lg:h-[193px] rounded-full overflow-hidden">
            <Image
              src="/assets/images/pic2.png"
              alt="pic"
              width={193}
              height={193}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-[120px] lg:w-[193px] h-[100px] lg:h-[144px] rounded-[50px] overflow-hidden">
            <Image
              src="/assets/images/pic3.png"
              alt="pic"
              width={193}
              height={144}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-10 lg:mt-0">
        {/* Heading */}
        <h5 className="text-pink-900 font-bold text-sm sm:text-base tracking-[4px] uppercase mb-4">
          {t("about-us")}
        </h5>

        {/* Sub Heading */}
        <h3 className="font-bold text-xl sm:text-2xl leading-[1.4] text-storm-900 mb-2">
          {t.rich("about-heading", {
            span: (v) => <span className="text-pink-900">{v}</span>,
          })}
        </h3>

        {/* Description */}
        <p className="text-storm-500 mb-6 text-sm sm:text-base leading-6">
          {t("home-about-description")}
        </p>

        {/* Discover Me */}
        <Button className="bg-pink-900 rounded-[10px] p-2.5 w-full sm:w-40 h-[49px] mb-6">
          {t("discover-more")}
          <ArrowRight size={18} strokeWidth={2.5} />
        </Button>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div className="bg-violet-900 rounded-full w-[42px] h-[42px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <p className="ms-2 text-sm">{t(`icon-${["one", "two", "three", "four"][i - 1]}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
