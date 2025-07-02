"use server";

import { EditProfileFields } from "@/lib/types/auth";
import { decode } from "next-auth/jwt";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function editprofileAction(fields: EditProfileFields) {
  // Variables
  const tokenCookie = cookies().get("next-auth.session-token")?.value;
  const token = await decode({ token: tokenCookie, secret: process.env.NEXTAUTH_SECRET! });

  const response = await fetch(`${process.env.API}/auth/editProfile`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
    body: JSON.stringify(fields),
  });

  const payload = await response.json();

  revalidateTag('profile')

  // if ( 'error' in payload ) throw new Error( payload.error )

  return payload;
}
