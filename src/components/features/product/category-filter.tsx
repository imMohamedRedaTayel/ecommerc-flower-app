"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/routing";
import useCategories from "@/hooks/products/use-categories";
import { FilterSkeleton } from "@/components/common/skeletons/_components/filter";

export function CategoryFilter() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fetch categories from the Hook
  const { data, error, isLoading } = useCategories();

  // Create Zod schema
  const formSchema = useMemo(
    () =>
      z.object({
        category: z.string().nonempty("Please select a category"),
      }),
    [],
  );

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: searchParams.get("category") || "",
    },
  });

  // Handle form submission
  const selectedCategoryId = form.watch("category");

  // Handle URL updates
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategoryId === "all-categories") {
      params.delete("category");
    } else if (selectedCategoryId) {
      params.set("category", selectedCategoryId);
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [selectedCategoryId, pathname, router, searchParams]);

  // Skeleton loading state
  if (isLoading) return <FilterSkeleton />;

  // Handle error
  if (error) return <div>{t("error-categories")}</div>;

  // Handle empty categories
  if (!data?.categories?.length) return <div>{t("no-categories")}</div>;

  return (
    <section className="max-w-xs my-3 p-6 rounded-2xl bg-white shadow-md">
      <Form {...form}>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-3">
              {/* Form title */}
              <FormLabel className="text-base font-bold">{t("category")}</FormLabel>
              <div className="max-w-56 border border-storm-500 mx-auto !my-7"></div>

              {/* Radio group for category selection */}
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-2"
                >
                  {/* Radio for all categories */}
                  <div className="flex items-center justify-between">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="all-categories" id="all-categories" />
                      </FormControl>
                      <FormLabel htmlFor="all-categories" className="font-normal">
                        All Categories
                      </FormLabel>
                    </FormItem>
                    <div className="flex flex-col space-y-2">({data?.metadata.totalItems})</div>
                  </div>

                  {/* Map through categories and create radio buttons */}
                  {data.categories.map((category) => (
                    <div className="flex items-center justify-between" key={category._id}>
                      {/* Radio button */}
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={category._id} id={category._id} />
                        </FormControl>
                        <FormLabel htmlFor={category._id} className="font-normal">
                          {category.name}
                        </FormLabel>
                      </FormItem>

                      {/* Products count badge */}
                      <div className="flex flex-col space-y-2">({category.productsCount})</div>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>

              {/* Form message for validation errors */}
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </section>
  );
}
