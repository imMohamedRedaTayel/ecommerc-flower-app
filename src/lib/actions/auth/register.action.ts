"use server";

import { RegisterFields } from "@/lib/types/auth";

export async function registerAction(fields: RegisterFields) {
  
  const response = await fetch(`${process.env.API}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify( fields ),
  });

  const payload = await response.json();

  // if ( 'error' in payload ) throw new Error( payload.error )

  return payload;
}
