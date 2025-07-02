import Image from "next/image";
import Headline from "@/components/common/headline";
import { useTranslations } from "next-intl";

export default function Companies() {
  // Translation
  const t = useTranslations();

  // Variables
  const companies = [
    { name: "Coconut", logo: "/assets/images/companies/comp1.png" },
    { name: "BruAsua", logo: "/assets/images/companies/comp2.png" },
    { name: "Yudonge", logo: "/assets/images/companies/comp3.png" },
    { name: "Conboard", logo: "/assets/images/companies/comp4.png" },
    { name: "Agyaq", logo: "/assets/images/companies/comp5.png" },
    { name: "Jusonge", logo: "/assets/images/companies/comp6.png" },
  ];

  return (
    <div className="container">
      <div className="my-16 text-center bg-pink-50 container h-fit py-10 px-6 rounded-[30px]">
        <Headline className="text-xl sm:text-2xl lg:text-[30px]">
          {t("trustedBy.start")} <span className="text-pink-900">4.5k+</span> {t("trustedBy.end")}
        </Headline>

        {/* Logos Grid */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 justify-items-center">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                src={company.logo}
                alt={company.name}
                width={400}
                height={0}
                className="w-[146.35px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
