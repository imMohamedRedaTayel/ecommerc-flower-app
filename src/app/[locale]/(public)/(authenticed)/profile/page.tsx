import React from "react";
import ProfileForm from "./_components/profile-form";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export default async function Page() {
  // Variables
  const tokenCookie = cookies().get("next-auth.session-token")?.value;
  const token = await decode({ token: tokenCookie, secret: process.env.NEXTAUTH_SECRET! });

  // Fetch Profile Data
  const response = await fetch(`${process.env.API}/auth/profile-data`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.token}`,
    },
    next: {
      tags: ["profile"],
    },
  });

  const payload = await response.json();

  return (
    <main className="flex justify-center items-center container ">
      <ProfileForm payload={payload} />
    </main>
  );
}
