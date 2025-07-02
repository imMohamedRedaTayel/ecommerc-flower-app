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
import { usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import useOccasions from "@/hooks/products/use-occasions";
import { useSearchParams } from "next/navigation";
import { FilterSkeleton } from "@/components/common/skeletons/_components/filter";

export function OccasionsFilter() {
  
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fetch occasions from the Hook
  const { data, error, isLoading } = useOccasions();

  // Create Zod schema
  const formSchema = useMemo(
    () =>
      z.object({
        occasion: z.string().nonempty("Please select a occasion"),
      }),
    [],
  );

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      occasion: searchParams.get("occasion") || "",
    },
  });

  // Handle form submission
  const selectedoccasionsId = form.watch("occasion");

  // Handle URL updates
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedoccasionsId === "all-occasions") {
      params.delete("occasion");
    } else if (selectedoccasionsId) {
      params.set("occasion", selectedoccasionsId);
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [selectedoccasionsId, pathname, router, searchParams]);

  // Skeleton loading state
  if (isLoading) return <FilterSkeleton />;

  // Handle error
  if (error) return <div>{t("error-loading-occasions")}</div>;

  // Handle empty occasions
  if (!data?.occasions?.length) return <div>{t("no-occasions-available")}</div>;

  return (
    <section className="max-w-xs my-3 p-6 rounded-2xl bg-white shadow-md">
      <Form {...form}>
        <FormField
          control={form.control}
          name="occasion"
          render={({ field }) => (
            <FormItem className="space-y-3">
              {/* Form title */}
              <FormLabel className="text-base font-bold">{t("occasions-0")}</FormLabel>
              <div className="max-w-56 border border-storm-500 mx-auto !my-7"></div>

              {/* Radio group for occasions selection */}
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-2"
                >
                  {/* Radio for all occasions */}
                  <div className="flex items-center justify-between">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="all-occasions" id="all-occasions" />
                      </FormControl>
                      <FormLabel htmlFor="all-occasions" className="font-normal">
                        All Occasions
                      </FormLabel>
                    </FormItem>
                    <div className="flex flex-col space-y-2">({data?.metadata.totalItems})</div>
                  </div>

                  {/* Map through categories and create radio buttons */}
                  {data.occasions.map((occasions) => (
                    <div className="flex items-center justify-between" key={occasions._id}>
                      {/* Radio button with label */}
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={occasions._id} id={occasions._id} />
                        </FormControl>
                        <FormLabel htmlFor={occasions._id} className="font-normal">
                          {occasions.name}
                        </FormLabel>
                      </FormItem>

                      {/* Products count display */}
                      <div className="flex flex-col space-y-2">({occasions.productsCount})</div>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>

              {/* Form validation message */}
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </section>
  );
}
