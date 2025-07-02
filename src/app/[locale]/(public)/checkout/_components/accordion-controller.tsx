"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { useBillingSchema } from "@/lib/schema/billing-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { PaymentStep } from "@/lib/constants/cart.constant";
import BillingAddressForm from "./billing-address-form";
import PaymentInfo from "./payment-info";

export default function AccordionController() {
  // Translation
  const t = useTranslations();

  // Schema
  const Schema = useBillingSchema();
  const form = useForm<z.infer<typeof Schema>>({
    defaultValues: {
      street: "",
      city: "",
      phone: "",
      lat: "",
      long: "",
    },
    resolver: zodResolver(Schema),
  });

  // Variables
  const [activeAccordion, setActiveAccordion] = useState<PaymentStep>(PaymentStep.BILLING_INFO);

  // Functions
  const onSubmit: SubmitHandler<z.infer<typeof Schema>> = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      form.setValue("lat", position.coords.latitude.toString());
      form.setValue("long", position.coords.longitude.toString());
    });

    setActiveAccordion(PaymentStep.PAYMENT_INFO);
  };

  return (
    <Accordion
      type="single"
      collapsible
      value={activeAccordion}
      onValueChange={(value: PaymentStep) => setActiveAccordion(value)}
      className="container flex flex-col gap-4"
    >
      {/* Accordion billing address */}
      <AccordionItem value={PaymentStep.BILLING_INFO} className="border-0">
        <AccordionTrigger className="text-pink-900 border border-gray-300 p-4 rounded-md">
          {t("your-billing-address")}
        </AccordionTrigger>
        <AccordionContent className="p-4  ">
          <BillingAddressForm form={form} onSubmit={onSubmit} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value={PaymentStep.PAYMENT_INFO} className="border-0">
        <AccordionTrigger className="text-pink-900 border border-gray-300 p-4 rounded-md">
          {t("your-payment-info")}
        </AccordionTrigger>
        <AccordionContent className="py-4">
          <PaymentInfo setActiveAccordion={setActiveAccordion} form={form} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}