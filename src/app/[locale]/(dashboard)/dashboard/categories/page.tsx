import { getTranslations } from "next-intl/server";
import SectionHeadline from "@/components/common/(dashboard)/section-headline";
import fetchCategories from "@/lib/apis/category.api";
import CategoriesClient from "./_components/categories-client";

export default async function CategoriesPage() {
  // Translation
  const t = await getTranslations();

  // Data fetching
  const payload = await fetchCategories();

  // Variables
  const categories = payload?.categories || [];

  return (
    <section className="flex flex-col gap-5 py-10 bg-white rounded-xl p-6">
      {/* Section headline */}
      <SectionHeadline
        title={t("all-categories")}
        route="/dashboard/categories/add-category"
        btnTitle={t("add-category")}
      />

      {/* CategoriesClient */}
      <CategoriesClient categories={categories} />
    </section>
  );
}