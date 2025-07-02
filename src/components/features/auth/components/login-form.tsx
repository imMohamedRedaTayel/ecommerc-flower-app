"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import useLogin from "@/hooks/use-login";
import { FormNameTypes } from "../auth-dailog";

export default function LoginForm({ setFormState }: FormNameTypes) {
  
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, login } = useLogin();

  // Form & Validation
  const Schema = z.object({
    email: z.string({ required_error: t("email-required") }).min(1, t("email-required")),
    password: z.string({ required_error: t("password-required") }).min(1, t("password-required")),
  });
  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
  });

  // Functions
  const onSubmit = (data: Inputs) => {
    login(data);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-normal text-3xl rtl:text-right">
          {/* Title */}
          {t("login-to-your-account")}
        </DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">
          {/* Email field */}
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <label htmlFor="email" className="sr-only">
                  {t("email-login")}
                </label>

                {/* Input */}
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder={t("email-login")}
                  className="h-12 px-4 rounded-3xl text-lg focus-visible:border-0 focus-visible:ring-1 focus-visible:ring-pink-900"
                  aria-invalid={!!form.formState.errors.email}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password field */}
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <label htmlFor="password" className="sr-only">
                  {t("password-login")}
                </label>

                {/* Input */}
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder={t("password-login")}
                  className="h-12 px-4 rounded-3xl text-lg focus-visible:border-0 focus-visible:ring-1 focus-visible:ring-pink-900"
                  aria-invalid={!!form.formState.errors.password}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Forget password button */}
          <div className="flex justify-end">
            <Button
              type="button"
              variant="link"
              className="text-pink-900 p-0 font-semibold text-sm"
              onClick={() => {
                setFormState("forgot-password");
              }}
            >
              {t("forgot-password")}
            </Button>
          </div>
          {/* Register button */}
          <div className="text-center text-sm mt-2">
            {t("no-account")}{" "}
            <Button
              type="button"
              variant="link"
              className="text-pink-900 p-0 h-auto font-semibold"
              onClick={() => setFormState("register")}
            >
              {t("create-one-here")}
            </Button>
          </div>
          {/* Erorr Message */}
          {error && <p className="text-sm text-center text-red-700">{error.message}</p>}
          {/* Submit button */}
          <Button
            type="submit"
            className="w-full h-12 bg-pink-900 hover:bg-pink-700 text-white rounded-full mt-2"
            disabled={isPending}
          >
            {t("login-button")}
          </Button>
        </form>
      </Form>
    </>
  );
}
