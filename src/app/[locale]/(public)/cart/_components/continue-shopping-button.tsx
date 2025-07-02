"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function ContinueShoppingButton() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/products")}
      className="max-w-[200px] bg-pink-900 hover:bg-pink-600 mt-10"
    >
      {t("continue-shopping")}
      <FaArrowRightLong className="rtl:rotate-180" />
    </Button>
  );
}
