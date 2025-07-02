"use server";

import { AUTH_COOKIE } from "@/lib/constants/auth.constants";
import { decode } from "next-auth/jwt";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function deleteCartItem(id: string) {
  // Translation
  const t = await getTranslations();

  // Variables
  const baseUrl = `${process.env.API}/cart/${id}`;

  // Get auth token from cookies
  const jwt = cookies().get(AUTH_COOKIE)?.value;

  if (!jwt) {
    return {error: t("unauthenticated-please-login-first")}
  }

  // Decode & verify the token
  const userData = await decode({
    token: jwt,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  // Request options
  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData?.token}`,
    },
  };

    const response = await fetch(baseUrl, requestOptions);

    const payload: APIResponse<CartResponse> = await response.json();

    // Check if request is not ok, throw this
    if (!response.ok) {
      if ("error" in payload) throw new Error(payload.error);
      throw new Error(t("failed-to-delete-this-product"));
    }

    revalidatePath('/cart');
    
    return payload;
}
