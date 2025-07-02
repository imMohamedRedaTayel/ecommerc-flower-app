"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function addProductToCart(productId: string, quantity: number) {
  // Token
  const cookie = cookies().get("next-auth.session-token")?.value;

  if (!cookie) {
    throw new Error("Unauthorized: Please Login to add Product");
  }

  const token = await decode({ token: cookie, secret: process.env.NEXTAUTH_SECRET! });

  const res = await fetch(`${process.env.API}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
    body: JSON.stringify({ product: productId, quantity }),
  });

  let data;
  try {
    data = await res.json();
  } catch (err: unknown) {
    console.log(err);
    throw new Error("Invalid response from server");
  }

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
}
