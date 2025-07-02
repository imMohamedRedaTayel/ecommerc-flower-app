"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { useBillingSchema } from "@/lib/schema/billing-form.schema";
import { getAuthToken } from "@/lib/utils/get-auth-token";
import { z } from "zod";

export async function cashCheckoutAction(
  billingInfo: z.infer<ReturnType<typeof useBillingSchema>>,
) {
  const token = await getAuthToken();
  const response = await fetch(`${process.env.API}/orders`, {
    method: "POST",
    body: JSON.stringify({
      shippingAddress: billingInfo,
    }),
    headers: {
      ...JSON_HEADER,
      token: `Bearer ${token}`,
    },
  });

  const payload: APIResponse<CashCheckoutResponse> = await response.json();

  return payload;
}

export async function creditCheckoutAction(
  billingInfo: z.infer<ReturnType<typeof useBillingSchema>>,
  successUrl: string,
) {
  const token = await getAuthToken();
  const response = await fetch(`${process.env.API}/orders/checkout?url=${successUrl}`, {
    method: "POST",
    body: JSON.stringify({
      shippingAddress: billingInfo,
    }),
    headers: {
      ...JSON_HEADER,
      token: `Bearer ${token}`,
    },
  });
  

  const payload: APIResponse<CreditCheckoutResponse> = await response.json();

  return payload;
}