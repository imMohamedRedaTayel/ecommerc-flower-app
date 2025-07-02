"use server"
import { JSON_HEADER } from "../constants/api.constant";
import { getAuthToken } from "../utils/get-auth-token";

export default async function fetchCart(
  token: string,
  body: { product: string; quantity: number }
) {
  // Variables
  const baseUrl = `${process.env.API}/cart`;

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const payload: CartResponse = await response.json();

    if (!response.ok || !payload) {
      throw new Error("Failed to fetch cart data");
    }

    return payload;
  } catch (err) {
    console.error("Cart API Error:", err);
    return null;
  }
}

export async function getCartItems() {
  const BASE_URL = `${process.env.API}/cart`;

  // Extract user token
  const token = await getAuthToken();

  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      
      
    });

    if (!response.ok) {
      throw new Error(`Failed with status ${response.status}: ${response.statusText}`);
    }

    const payload: APIResponse<CartResponse> = await response.json();
    
    if ("error" in payload) throw new Error(payload.error);

    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
