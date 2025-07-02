"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

// Constants
const STATUS_OPTIONS = [
  {
    label: "onSale",
    key: "priceAfterDiscount[gt]",
    value: "0",
  },
  {
    label: "inStock",
    key: "quantity[gt]",
    value: "0",
  },
] as const;

export default function StatusFilter() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //Variables
  const currentParams = new URLSearchParams(searchParams.toString());

  // Functions
  const isChecked = (key: string, value: string) => currentParams.get(key) === value;

  const handleCheckboxChange = (checked: boolean, key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="m-6">
      <div className="border-b border-storm-500 m-6">
        <h3 className="font-bold mb-3 font-inter leading-10 text-lg">{t("status")}</h3>
      </div>

      {STATUS_OPTIONS.map(({ label, key, value }) => (
        <div key={label} className="flex items-center space-x-2 mb-2">
          <Checkbox
            id={label}
            checked={isChecked(key, value)}
            onCheckedChange={(checked) => handleCheckboxChange(!!checked, key, value)}
          />
          <Label htmlFor={label} className="cursor-pointer text-pink-900">
            {t(label)}
          </Label>
        </div>
      ))}
    </section>
  );
}
