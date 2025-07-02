import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Button } from "@/components/ui/button";

  import { useTranslations } from "next-intl";
  import { Input } from "@/components/ui/input";

  import { UseFormReturn } from "react-hook-form";
  import { z } from "zod";
import { ArrowRight } from "@/components/common/arrow";
import { useBillingSchema } from "@/lib/schema/billing-form.schema";


  interface BillingAddressFormProps {
    onSubmit: (values: z.infer<ReturnType<typeof useBillingSchema>>) => void;
    form: UseFormReturn<z.infer<ReturnType<typeof useBillingSchema>>>;
  }

  export default function BillingAddressForm({ form, onSubmit }: BillingAddressFormProps) {
    // Translation
    const t = useTranslations();

    return (
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Form fields here... */}
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("street")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="street"
                    className="border border-gray-300 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("city")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="city"
                    className="border border-gray-300 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("phone")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="phone"
                    className="border border-gray-300 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <div className="mt-3 flex justify-end">
            <Button className="bg-pink-900 rounded-xl px-3 self-end hover:bg-pink-700">
              {t("next-step")}
              <ArrowRight />
            </Button>
          </div>
        </form>
      </Form>
    );
  }