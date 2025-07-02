"use client";

import { Button } from "@/components/ui/button";
import { FormNameTypes } from "../auth-dailog";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import useVerifyOtp from "@/hooks/auth/use-verify-otp";

export default function VerifyOTPForm({ setFormState }: FormNameTypes) {
  // Translation
  const t = useTranslations();

  // Mutation
  const { setPassword } = useVerifyOtp();
  // Form & Validation
  const schema = z.object({
    code: z
      .string()
      .min(6, t("validation-verify"))
      .max(6, t("validation-verify"))
      .regex(/^[0-9]+$/, t("Code-numeric")),
  });
  type VerifyCodeInputs = z.infer<typeof schema>;

  const form = useForm<VerifyCodeInputs>({
    resolver: zodResolver(schema),
    defaultValues: { code: "" },
  });

  // Functions
  const onSubmit = (data: VerifyCodeInputs) => {
    setPassword({ resetCode: data.code });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-normal text-3xl rtl:text-right">
          {/* Title */}
          {t("verify-opt")}
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">
          {/* Code OPT field */}
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <label htmlFor="code" className="sr-only">
                  {t("enter-code")}
                </label>

                {/* Input */}
                <Input
                  {...field}
                  id="code"
                  type="text"
                  placeholder={t("enter-code")}
                  className="h-12 px-4 rounded-3xl text-lg focus-visible:border-0 focus-visible:ring-1 focus-visible:ring-pink-900"
                  maxLength={6}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Send email */}
          <div className="flex justify-end text-sm mt-2">
            {t("did-receive-code")}{" "}
            <Button
              type="button"
              variant="link"
              className="text-pink-900 p-0 h-auto font-semibold"
              onClick={() => setFormState("forgot-password")}
            >
              {t("resend")}
            </Button>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full h-12 bg-pink-900 hover:bg-pink-700 text-white rounded-full mt-2"
            onClick={() => setFormState("set-password")}
          >
            {t("recover-password")}
          </Button>
        </form>
      </Form>
    </>
  );
}
