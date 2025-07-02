import { useTranslations } from "next-intl";

export default function NotFoundComponent() {
  // Translation
  const t = useTranslations();

  return (
    <section className="flex flex-col gap-6 text-center items-center">
      {/* Headline */}
      <span className="text-9xl text-red-500 font-bold">404</span>

      {/* Error message */}
      <p className="px-3 py-2 text-lg font-medium rounded-full bg-red-50 text-red-400 border border-red-500">
        {t("page-not-found-1")}
      </p>
    </section>
  );
}
