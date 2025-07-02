"use server";

import { ForgotPasswordFields } from "@/lib/types/auth";

export async function forgotpasswordAction(fields: ForgotPasswordFields) {
  
  const response = await fetch(`${process.env.API}/auth/forgotPassword`, {
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
