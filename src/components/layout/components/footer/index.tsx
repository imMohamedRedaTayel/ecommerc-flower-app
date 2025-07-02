import { Link } from "@/i18n/routing";
import FooterForm from "./footer-form";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  // Translations
  const t = useTranslations();

  // Variables
  const footerLinks = [
    { href: "/about", label: t("about_us") },
    { href: "/store-location", label: t("store_location") },
    { href: "/contact", label: t("contact") },
    { href: "/delivery", label: t("delivery") },
    { href: "/faq", label: t("faqs") },
    { href: "/policy", label: t("Policie") },
  ];

  return (
    <footer className="relative">
      {/* Background Image footer */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/footer-image.png"
          alt="Footer Background"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="container mx-auto relative z-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-10">
          {/* Navigation */}
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-4 sm:gap-x-10 md:gap-x-20">
            {/* Links footer */}
            {footerLinks.map((link, index) => (
              <li key={index}>
                <Link className="text-base font-bold" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Text */}
          <div className="text-center py-10">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {t("get_discount")}{" "}
              <span className="text-2xl sm:text-3xl font-bold text-pink-900 px-1">
                {t("discount_value")}
              </span>
              {t("discount_Coupon")}
            </h2>
            <p className="text-storm-500 font-medium text-lg sm:text-xl mt-2">
              {t("subscribe_message")}
            </p>
          </div>

          {/* Footer Form */}
          <FooterForm />
        </div>
      </div>
    </footer>
  );
}
