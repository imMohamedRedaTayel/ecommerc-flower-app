/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function checkoutOrder(data: any, location: { lat: string; long: string }) {
  // Token
  const cookie = cookies().get("next-auth.session-token")?.value;
  if (!cookie) throw new Error("Unauthorized: No token found");

  const token = await decode({ token: cookie, secret: process.env.NEXTAUTH_SECRET! });
  if (!token?.token) throw new Error("Invalid token");

  // Send a request API
  const response = await fetch(`${process.env.API}/orders/checkout?url=http://localhost:3000`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify({
      shippingAddress: {
        street: data.addressLine1,
        phone: data.phone,
        city: data.city,
        lat: location.lat,
        long: location.long,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}