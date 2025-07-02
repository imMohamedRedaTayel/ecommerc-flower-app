"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormNameTypes } from "../auth-dailog";
import useRegister from "@/hooks/auth/use-register";
import { RegisterFields } from "@/lib/types/auth";

export default function RegisterForm({ setFormState }: FormNameTypes) {
  // Translation
  const t = useTranslations();
  const locale = useLocale();

  // Mutation
  const { isPending, error, register } = useRegister({ setFormState }); 

  // Form and validation
  const registerationSchema = z
    .object({
      firstName: z
        .string({ required_error: t("firstName-required") })
        .min(2, t("firstName-validation")),

      lastName: z
        .string({ required_error: t("lastName-required") })
        .min(2, t("lastName-validation")),

      email: z
        .string({ required_error: t("email-is-required") })
        .email(t("email-validation")),

        phone: z
        .string({ required_error: t("phone-required") })
        .regex(/^(?:\+?20|0)?1[0125][0-9]{8}$/, t("phone-validation")),
        
      gender: z
        .string({ required_error: t("gender-required") })
        .regex(/^(male|female)$/, t("gender-validation")),

        password: z
        .string({ required_error: t("password-required") })
        .regex(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          t("password-validation")
        ),

      rePassword: z.string({
        required_error: t("password-confirmation-required"),
      }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t("password-dont-match"),
      path: ["rePassword"],
    });
  type registerFields = z.infer<typeof registerationSchema>;

  const form = useForm<registerFields>({
    resolver: zodResolver(registerationSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<registerFields> = (data) => {
    console.log("Form data submitted:", data);
    register(data as RegisterFields);
  };

  return (
    <>
      {/* Header */}
      <DialogHeader>
        <DialogTitle className="text-3xl font-normal capitalize rtl:text-right rtl:pr-7">
          {t("create-account")}
        </DialogTitle>
      </DialogHeader>

      {/* Form */}
      {/* <ScrollArea className="h-[400px] pe-4"> */}
      <Form {...form}>
        <form
          dir={locale === "ar" ? "rtl" : "ltr"}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 max-w-md w-full mx-auto rounded-[20px] text-base leading-9 text-gray-shade-50 shadow-[0px_4px_30px_0px_rgba(0,0,0,0,0.05)]"
        >
          {/* First name field */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="firstName" className="sr-only">
                  {t("first-name")}
                </FormLabel>
                <FormControl>
                  <Input
                    id="firstName"
                    placeholder={t("first-name")}
                    {...field}
                    className="drop-shadow-[0px_1px_3px_rgba(0,0,0,0.10)]"
                  />
                </FormControl>
                <FormMessage className="ms-5" />
              </FormItem>
            )}
          />

          {/* Last name field */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="lastName" className="sr-only">
                  {t("last-name")}
                </FormLabel>
                <FormControl>
                  <Input
                    id="lastName"
                    placeholder={t("last-name")}
                    {...field}
                    className="drop-shadow-[0px_1px_3px_rgba(0,0,0,0.10)] "
                  />
                </FormControl>
                <FormMessage className="ms-5" />
              </FormItem>
            )}
          />

          {/* Phone field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phone" className="sr-only">
                  {t("phone")}
                </FormLabel>
                <FormControl>
                  <Input
                    id="phone"
                    placeholder={t("phone-placeholder")}
                    {...field}
                    className="drop-shadow-[0px_1px_3px_rgba(0,0,0,0.10)] "
                  />
                </FormControl>
                <FormMessage className="ms-5" />
              </FormItem>
            )}
          />

          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email" className="sr-only">
                  {t("Email")}
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder={t("Email")}
                    {...field}
                    className="drop-shadow-[0px_1px_3px_rgba(0,0,0,0.10)] "
                  />
                </FormControl>
                <FormMessage className="ms-5" />
              </FormItem>
            )}
          />

          {/* Password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password" className="sr-only">
                  {t("password")}
                </FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t("password")}
                    {...field}
                    className="drop-shadow-[0px_1px_3px_rgba(0,0,0,0.10)] "
                  />
                </FormControl>
                <FormMessage className="ms-5" />
              </FormItem>
            )}
          />

          {/* Confirm Password field */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="rePassword" className="sr-only">
                  {t("confirm-password")}
                </FormLabel>
                <FormControl>
                  <Input
                    id="rePassword"
                    type="password"
                    placeholder={t("confirm-password")}
                    {...field}
                    className="drop-shadow-[0px_1px_3px_rgba(0,0,0,0.10)] "
                  />
                </FormControl>
                <FormMessage className="ms-5" />
              </FormItem>
            )}
          />

          {/* Gender field */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="gender" className="sr-only">
                  {t("gender")}
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    dir={locale === "ar" ? "rtl" : "ltr"}
                  >
                    <SelectTrigger className="drop-shadow-[0px_1px_3px_rgba(0,0,0,0.10)] ">
                      <SelectValue placeholder={t("gender")} />
                    </SelectTrigger>
                    <SelectContent className="drop-shadow-[0px_1px_3px_rgba(0,0,0,0.10)] ">
                      <SelectItem value="male" className="">
                        {t("male")}
                      </SelectItem>
                      <SelectItem value="female" className="">
                        {t("female")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="ms-5" />
              </FormItem>
            )}
          />

          {/* Login prompt */}
          <p className="text-sm text-gray-shade-100 text-center my-2">
            {t("already-have-an-account")}
            <button
              type="button"
              onClick={() => setFormState("login")}
              className="underline text-pink-900 ps-1"
            >
              {t("login")}
            </button>
          </p>

          {/* Erorr Message */}
          {error && (
            <p className="text-sm text-center text-red-700">{error.message}</p>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            className="capitalize text-white bg-pink-900 rounded-3xl px-8 w-full font-medium text-base leading-[50px]"
            disabled={isPending}
          >
            {t("create-account")}
          </Button>
        </form>
      </Form>
      {/* </ScrollArea> */}
    </>
  );
}
