import { NextIntlClientProvider, useMessages } from "next-intl";
import ReactQueryProvider from "./components/react-query-provider";
import NextAuthProvider from "./components/next-auth-provider";
import NextIntlProvider from "./components/next-Intl-client-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Translation
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <NextAuthProvider>
        <NextIntlProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextIntlProvider>
      </NextAuthProvider>
    </NextIntlClientProvider>
  );
}
