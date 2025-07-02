import { getNextIntlFormats } from "@/i18n/request";
import { Locale } from "@/i18n/routing";
import { NextIntlClientProvider, useLocale, useMessages, useNow, useTimeZone } from "next-intl";

type NextIntlClientProviderProps = {
  children: React.ReactNode;
};

export default function NextIntlProvider({ children }: NextIntlClientProviderProps) {
  // Varibales
  const messages = useMessages();
  const locale = useLocale() as Locale ;
  const now = useNow();
  const timezone = useTimeZone();

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      now={now}
      timeZone={timezone}
      formats={getNextIntlFormats(locale)}
    >
      {children}
    </NextIntlClientProvider>
  );
}
