import { Locale, routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Roboto } from "next/font/google";
import { cn } from "@/lib/utils/cn";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers";

// Font configurations
const inter = Inter({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

// Define the LayoutProps type
interface LayoutProps {
  params: {
    locale: Locale;
  };
  children: React.ReactNode;
}

export default async function LocaleLayout({ params: { locale }, children }: LayoutProps) {
  // Validate the locale
  if (!routing.locales.includes(locale)) notFound();

  // Set the request locale
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={cn(inter.className, inter.variable, roboto.variable)}>
        <Providers>
          {children}
          {/* Toaster */}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
