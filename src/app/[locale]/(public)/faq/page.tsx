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
      <h1 className="text-4xl font-bold mb-8 text-left text-storm-900">{t("faq-page")}!</h1>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">{t("Q1")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("answer1")}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl">{t("Q2")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("answer2")}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xl">{t("Q3")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("answer3")}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-xl">{t("Q4")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("answer4")}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-xl">{t("Q5")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("answer5")}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="text-xl">{t("Q6")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("answer6")}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger className="text-xl">{t("Q7")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("answer7")}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger className="text-xl">{t("Q8")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("answer8")}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
          <AccordionTrigger className="text-xl">{t("Q9")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("answer9")}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10">
          <AccordionTrigger className="text-xl">{t("Q10")}</AccordionTrigger>
          <AccordionContent className="text-gray-700">{t("answer10")}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
