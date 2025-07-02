import React from "react";
import { useTranslations } from "next-intl";

export default function Page() {
  // Translation
  const t = useTranslations();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-left text-storm-900">{t("Policie")}</h1>

      {/* Terms and Conditions Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-storm-900">1. {t("conditions")}</h2>
        <p className="mb-2">{t("termsandconditions")}</p>
        <ul className="list-disc list-inside mb-4">
          <li>{t("conditions1")}</li>
          <li>{t("conditions2")}</li>
          <li>{t("conditions3")}</li>
        </ul>
      </section>

      {/* Privacy Policy Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-storm-900">2.{t("privacypolicy")}</h2>
        <p className="mb-2">{t("descriptionprivacypolicy")}</p>
        <ul className="list-disc list-inside mb-4">
          <li>{t("police1")}</li>
          <li>{t("police2")}</li>
          <li>{t("police3")}</li>
        </ul>
      </section>

      {/* Additional Policies Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-storm-900">3. {t("otherpolicies")}</h2>
        <p className="mb-2">{t("descriptionotherpolicies")}</p>
      </section>
    </div>
  );
}
