import { getRequestConfig } from "next-intl/server";
import { Locale, routing } from "./routing";
import { Formats } from "next-intl";
import { CURRENCY } from "@/lib/constants/common";

export const getNextIntlFormats = (Locale: Locale): Formats => {
  // Varibales
  const numberingSystem = Locale === "ar" ? "arab" : "latn";

  return {
    number: {
      digit: {
        numberingSystem: numberingSystem,
      },
      "currency-base": {
        numberingSystem: numberingSystem,
        currency: CURRENCY,
        style: "currency",
        maximumFractionDigits: 2,
      },
      "currency-base-no-fractions": {
        numberingSystem: numberingSystem,
        currency: CURRENCY,
        style: "currency",
        maximumFractionDigits: 0,
      },
      "currency-full": {
        numberingSystem: numberingSystem,
        currencyDisplay: Locale === "ar" ? "name" : "code",
        currency: CURRENCY,
        style: "currency",
        maximumFractionDigits: 0,
        currencySign: "standard" 
        
      },
 
    },
    dateTime: {
      "date-short": {
        numberingSystem: numberingSystem,
        dateStyle: "short",
      },
      "date-long": {
        numberingSystem: numberingSystem,
        dateStyle: "long",
      },
      "date-full": {
        numberingSystem: numberingSystem,
        dateStyle: "full",
      },
      "date-max": {
        numberingSystem: numberingSystem,
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        weekday: "short",
      },
      "date-month-only": {
        month: "numeric",
      },
      "date-day-only": {
        day: "numeric",
      },
      "date-time-only": {
        hour: "numeric",
        minute: "numeric",
      },
    },
  };
};

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    formats: getNextIntlFormats(locale as Locale),
  };
});
