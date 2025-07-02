"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { ArrowRight } from "@/components/common/arrow";

export default function FooterForm() {
  // Translations
  const t = useTranslations();

  // Form & Validation
  const Schema = z.object({
    email: z.string({ required_error: t("email-required") }).min(1, t("email-required")),
  });

  type emailInput = z.infer<typeof Schema>;

  const form = useForm<emailInput>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(Schema),
  });

  // Function
  const onSubmit: SubmitHandler<emailInput> = async (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full md:w-[400px]  ">
        {/* Email input */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="space-y-0">
                {/* Label */}
                <Label className=" sr-only ">{t("Email")}</Label>

                {/* Input */}
                <Input {...field} placeholder={t("Enter-Your-Email")} type="email" />

                {/* Feedback */}
                <FormMessage className="absolute top-full mt-1" />
              </FormItem>
            );
          }}
        />

        {/* Subscribe */}
        <Button
          variant="main"
          className="absolute ltr:right-0.5 rtl:left-0.5 h-[90%] top-1/2 -translate-y-1/2"
        >
          {t("Supscribe-Btn")}
          <ArrowRight />
        </Button>
      </form>
    </Form>
  );
}
