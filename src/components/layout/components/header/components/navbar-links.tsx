import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type NavLinsProps = {
  smallScreen?: boolean;
  openMenu?: Dispatch<SetStateAction<boolean>>;
};
export default function NavbarLinks({ smallScreen, openMenu }: NavLinsProps) {
  // Translations
  const t = useTranslations();

  // Navgation
  const pathname = usePathname();
  const locale = useLocale();

  const headerLinks = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("all-products") },
    { href: "/about", label: t("about_us") },
    { href: "/contact", label: t("contact") },
  ];

  // Helper function
  const isActiveLink = (href: string) => {
    // removing locale from pathname if exist
    const normalizedPathname = pathname.replace(`/${locale}`, "") || "/";

    // Normalize href for comparison
    const normalizedHref = href === "/" ? "/" : href.replace(/\/$/, "");

    // Check if the normalized pathname matches the href
    return normalizedPathname === normalizedHref || normalizedPathname === `${normalizedHref}/`;
  };

  return (
    <div>
      {/* Navigation */}
      <ul className="flex flex-col md:flex-row gap-x-5 lg:gap-x-6 justify-center py-3 md:py-0">
        {headerLinks.map((link) => (
          <li key={link.href} className="py-3 px-6 md:p-0">
            <Link
              onClick={() => {
                if (smallScreen && openMenu) openMenu(false);
              }}
              className={`${isActiveLink(link.href) ? "text-pink-900" : "text-zinc-900"}
                font-medium hover:text-pink-700 transition-colors text-sm lg:text-base`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
