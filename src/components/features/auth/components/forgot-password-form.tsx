"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useForgotPassword from "@/hooks/auth/use-forgot-password";
import { FormNameTypes } from "../auth-dailog";

export default function ForgotPasswordForm({ setFormState }: FormNameTypes) {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, ForgotPassword } = useForgotPassword();

  // Form & Validation
  const Schema = z.object({
    email: z
      .string({ required_error: t("email-required") })
      .min(1, t("email-required"))
      .email(t("email-vaild")),
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(Schema),
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    ForgotPassword(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {/* Email */}
        <div className="w-full pb-8">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Custom Label */}
                <FormLabel className="sr-only"> {t("Email")} </FormLabel>

                {/* Custom input */}
                <FormControl>
                  <Input {...field} placeholder="example@gmail.com" />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center pb-5 ">
            {" "}
            {error.message}{" "}
          </p>
        )}

        <div className="flex flex-col items-center justify-center w-full ">
          <Button
            onClick={() => setFormState("verify-otp")}
            disabled={
              isPending ||
              (form.formState.isSubmitted && !form.formState.isValid)
            }
            className="bg-pink-900 w-full rounded-2xl "
          >
            {t("recover-password")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
