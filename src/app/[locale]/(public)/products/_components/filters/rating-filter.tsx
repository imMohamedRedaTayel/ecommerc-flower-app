"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";

// Constants
const RATING_OPTIONS = ["5", "4", "3", "2", "1"] as const;

export default function RatingFilter() {
  // Navigation and state
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentRating = searchParams.get("rateAvg[gte]") || "";

  // Translations
  const t = useTranslations();

  // Functions
  const handleValueChange = (value: string) => {
    const newValue = value === currentRating ? "" : value;
    const params = new URLSearchParams(searchParams.toString());

    if (newValue) {
      params.set("rateAvg[gte]", newValue);
    } else {
      params.delete("rateAvg[gte]");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="m-6">
      <div className="border-b border-storm-500 m-6">
        <h3 className="font-bold mb-3 font-inter leading-10 text-lg">{t("ratings")}</h3>
      </div>

      <RadioGroup value={currentRating} onValueChange={handleValueChange} className="space-y-3">
        {RATING_OPTIONS.map((stars) => {
          const value = stars.toString();
          return (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={`rating-${value}`} />
              <Label htmlFor={`rating-${value}`} className="cursor-pointer text-pink-900">
                {stars === "5" ? t("5-stars") : `${stars} ${t("stars-and-up")}`}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </section>
  );
}
