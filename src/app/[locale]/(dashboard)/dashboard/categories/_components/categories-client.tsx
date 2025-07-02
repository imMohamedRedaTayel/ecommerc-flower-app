"use client";

import { Input } from "@/components/ui/input";
import { CategoriesTable } from "./categories-table";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function CategoriesClient({ categories }: { categories: Category[] }) {
  // Translation
  const t = useTranslations();

  // States
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Debounce the search input
  const [debounceValue] = useDebounce(searchValue, 500);

  // Side effects
  useEffect(() => {
    setIsLoading(true);

    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(debounceValue.toLowerCase()),
    );

    setFilteredData(filtered);
    setIsLoading(false);
  }, [debounceValue, categories]);

  return (
    <>
      {/* Search input */}
      <Input
        type="search"
        placeholder={t("search-for-a-category")}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {/* Categories table */}
      <CategoriesTable categories={filteredData} isLoading={isLoading} />
    </>
  );
}