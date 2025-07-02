"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import useEditProfile from "../_hooks/use-edit-profile";
import ProfilePhoto from "./profile-photo";

type ProfileFormProps = {
  payload: Payload;
};

export default function ProfileForm({ payload }: ProfileFormProps) {

  console.log(payload);
  
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, EditProfile } = useEditProfile();

  // Form & Validation
  const Schema = z.object({
    firstName: z
      .string({ required_error: t("fristname-required") })
      .min(1, t("fristname-required"))
      .min(2, t("fristname-min", { number: 2 })),
    lastName: z
      .string({ required_error: t("lastName-required") })
      .min(1, t("lastName-required"))
      .min(2, t("lastName-min", { number: 2 })),
    email: z
      .string({ required_error: t("email-required") })
      .min(1, t("email-required"))
      .email(t("email-vaild")),
    profilePhoto: z.any().optional(),
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    values: {
      firstName: payload?.user?.firstName || "",
      lastName: payload?.user?.lastName || "",
      email: payload?.user?.email || "",
    },
    resolver: zodResolver(Schema),
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    // console.log(values, "values");
    EditProfile(values);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[500px] py-10 "
        >
          <div className="flex flex-col space-y-4 pt-[40px] ">
            {/* Profile Photo */}
            <ProfilePhoto
              onFileSelected={() => {
                form.setValue("profilePhoto", {
                  shouldDirty: true,
                });
              }}
              imageProfile={ payload.user.photo }
            />

            {/* FirstName */}
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  {/* Custom Label */}
                  <FormLabel> {t("first-name")} </FormLabel>

                  {/* Custom input */}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("first-name")}
                      className="px-4 text-lg rounded-md focus-visible:border-0 focus-visible:ring-1 focus-visible:ring-pink-900"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LastName */}
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  {/* Custom Label */}
                  <FormLabel> {t("last-name")} </FormLabel>

                  {/* Custom input */}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("last-name")}
                      className="px-4 text-lg rounded-md focus-visible:border-0 focus-visible:ring-1 focus-visible:ring-pink-900"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  {/* Custom Label */}
                  <FormLabel> {t("Email")} </FormLabel>

                  {/* Custom input */}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("Email")}
                      disabled
                      className="px-4 text-lg rounded-md focus-visible:border-0 focus-visible:ring-1 focus-visible:ring-pink-900"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Gender */}
            <FormItem className="flex flex-col space-y-1.5">
              {/* Custom Label */}
              <FormLabel> {t("gender")} </FormLabel>

              {/* Custom input */}
              <FormControl>
                <Input
                  value={payload?.user?.gender}
                  readOnly
                  placeholder={t("gender")}
                  disabled
                  className="px-4 text-lg rounded-md focus-visible:border-0 focus-visible:ring-1 focus-visible:ring-pink-900"
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-center  ">
              {" "}
              {error.message}{" "}
            </p>
          )}

          <div className="flex flex-col items-end justify-end w-full gap-y-2 mt-5 ">
            <Button
              disabled={
                isPending ||
                (form.formState.isSubmitted && !form.formState.isValid)
              }
              className="text-[16px] font-[700] w-fit rounded-sm  "
              variant="main"
              size="default"
            >
              {t("Save-Changes-Btn")}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
