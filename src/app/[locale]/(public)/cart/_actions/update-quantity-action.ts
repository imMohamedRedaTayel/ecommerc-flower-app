"use server";

import { AUTH_COOKIE } from "@/lib/constants/auth.constants";
import { decode } from "next-auth/jwt";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type UpdateQuantityCredintials = {
  productId: string;
  quantity: number;
};

export default async function updateQuantity({ productId, quantity }: UpdateQuantityCredintials) {
  // Translation
  const t = await getTranslations();

  // Variables
  const baseUrl = `${process.env.API}/cart/${productId}`;

  // Get auth token from cookies
  const authToken = cookies().get(AUTH_COOKIE)?.value;

  if (!authToken) {
    return { error: t("unauthenticated-please-login-first") };
  }

  // Decode & verify the token
  const userData = await decode({
    token: authToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  // Request options
  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData?.token}`,
    },
    body: JSON.stringify({ quantity }),
  };

  const response = await fetch(baseUrl, requestOptions);

  const payload: APIResponse<CartResponse> = await response.json();

  // Check if request is not ok, throw this
  if (!response.ok) {
    if ("error" in payload) return payload;
  }

  // Update the UI after update quantity
  revalidatePath("/cart");

  return payload;
}
