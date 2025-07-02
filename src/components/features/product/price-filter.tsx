"use client";

import { cn } from "@/lib/utils/cn";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

type SliderProps = React.ComponentProps<typeof Slider>;

/// Constants
const minValue = 0;
const maxValue = 10000;
const defaultValue = [minValue, maxValue];

export function PriceFilter({ className, ...props }: SliderProps) {
  // Translation
  const t = useTranslations();
  const format = useFormatter();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State
  const [value, setValue] = useState<[number, number]>([minValue, maxValue]);

  // Update the URL when the value changes
  const applyFilter = useDebouncedCallback((newValue: [number, number]) => {
    const searchQuery = new URLSearchParams(searchParams.toString());
    const isDefault = newValue[0] === defaultValue[0] && newValue[1] === defaultValue[1];

    // If the newValue is the default value, remove the price filter from the URL
    if (isDefault) {
      searchQuery.delete("price[gte]");
      searchQuery.delete("price[lte]");
    } else {
      searchQuery.set("price[gte]", newValue[0].toString());
      searchQuery.set("price[lte]", newValue[1].toString());
    }
    router.push(`${pathname}${searchQuery.toString() ? `?${searchQuery.toString()}` : ""}`);
  }, 1000);

  // Value change
  const handleValueChange = (newValue: [number, number]) => {
    setValue(newValue);
    applyFilter(newValue);
  };

  // Initialize the slider with the values from the URL
  useEffect(() => {
    const gte = parseInt(searchParams.get("price[gte]") || `${minValue}`);
    const lte = parseInt(searchParams.get("price[lte]") || `${maxValue}`);

    if (!isNaN(gte) && !isNaN(lte) && (gte !== value[0] || lte !== value[1])) {
      setValue([gte, lte]);
    }
  }, [searchParams]);

  return (
    <section className="max-w-xs space-y-6 my-3 p-6 rounded-2xl bg-white shadow-md">
      {/* Title section */}
      <div>
        <h2 className="text-base font-bold text-foreground">{t("price-range")}</h2>
        <div className="max-w-56 border border-storm-500 mx-auto !my-7"></div>
      </div>

      {/* Price display */}
      <div className="flex justify-between items-center">
        <span className="font-medium text-primary">
          {format.number(value[0], {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </span>
        <span className="font-medium text-primary">
          {format.number(value[1], {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </span>
      </div>

      {/* Slider with debounced output */}
      <Slider
        defaultValue={[minValue, maxValue]}
        min={minValue}
        max={maxValue}
        step={100}
        minStepsBetweenThumbs={1}
        value={value}
        onValueChange={handleValueChange}
        className={cn("w-full", className)}
        {...props}
      />
    </section>
  );
}
