"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useSetPassword from "@/hooks/auth/use-set-password";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { FormNameTypes } from "../auth-dailog";


export default function SetPassword({ setFormState }: FormNameTypes) {


  // Translation
  const t = useTranslations();


  // Validations schema
  const schema = z
    .object({
      password: z
        .string({ required_error: t("password-is-required") })
        .min(1, t("password-is-required"))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          t("regex-set-password"),
        ),
      confirmPassword: z
        .string({ required_error: t("password-is-required") })
        .min(1, t("password-is-required")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwords-not-match"),
    });

  // Type for Set Password
  type setPasswordInput = z.infer<typeof schema>;

  // Hook for Set Password
  const { isPending, error, setPassword } = useSetPassword({setFormState});

  // Form & Validations
  const form = useForm<setPasswordInput>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  // Function
  const onSubmit: SubmitHandler<setPasswordInput> = async (values) => {
    const payload: setPasswordValuse = {
      newPassword: values.password,
    };

    setPassword(payload);
  };

  return (
    <div className="bg-black bg-opacity-80 h-screen flex items-center justify-center">
      {/* Container */}
      <div className="container max-w-[608px] mx-auto max-h-[366px] bg-white p-4 rounded-[20px] shadow-md">
        {/* Heading */}
        <h1 className="text-3xl my-4">{t("set-a-password-h1")}</h1>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t("password")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("create-password")} type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t("re-enter-your-new-password")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("re-enter-password")} type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error Message */}
            {error && <p className="text-sm text-red-500 font-semibold">{error.message}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-pink-900 text-white py-2 px-4 rounded-[30px] w-full my-4 text-center disabled:opacity-50"
              disabled={isPending || !form.formState.isValid}
            >
              {isPending ? t("processing") : t("set-a-password")}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
