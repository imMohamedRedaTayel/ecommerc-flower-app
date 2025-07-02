import React from "react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Page() {
  // Translation
  const t = useTranslations();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-left text-storm-900">{t("delivery")}</h1>
      <Accordion type="single" collapsible>
        {/* Shipping Times */}
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">{t("delivery1")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("deliveryanswer1")}</AccordionContent>
        </AccordionItem>

        {/* Delivery Zones */}
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl">{t("delivery2")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("deliveryanswer2")}</AccordionContent>
        </AccordionItem>

        {/* Shipping Fees */}
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xl">{t("delivery3")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("deliveryanswer3")}</AccordionContent>
        </AccordionItem>

        {/* Missed Delivery Policy */}
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-xl">{t("delivery4")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("deliveryanswer4")}</AccordionContent>
        </AccordionItem>

        {/* Delivery Methods */}
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-xl">{t("delivery5")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("deliveryanswer5")}</AccordionContent>
        </AccordionItem>

        {/* Same-day Delivery */}
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-xl">{t("delivery6")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("deliveryanswer6")}</AccordionContent>
        </AccordionItem>

        {/* International Shipping */}
        <AccordionItem value="item-7">
          <AccordionTrigger className="text-xl">{t("delivery7")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("deliveryanswer7")}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
