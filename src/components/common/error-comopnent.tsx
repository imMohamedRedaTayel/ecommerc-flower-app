import { useTranslations } from "next-intl";

type ErrorComponentProps = {
  children?: React.ReactNode;
};

export default function ErrorComponent({ children }: ErrorComponentProps) {
  // Translation
  const t = useTranslations();

  return (
    <section className="flex flex-col gap-6 text-center items-center">
      {/* Headline */}
      <span className="text-9xl text-red-500 font-bold">{t("error-0")}</span>

      {/* Error message */}
      <p className="px-3 py-2 rounded-full bg-red-50 text-red-400 border border-red-500">
        {children || t("something-went-wrong")}
      </p>
    </section>
  );
}
