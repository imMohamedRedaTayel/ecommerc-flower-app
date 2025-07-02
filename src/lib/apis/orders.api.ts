import { getAuthToken } from "../utils/get-auth-token";

export async function getUserOrders() {
  const token = await getAuthToken();
  if (!token) return "unauthenticated-please-login-first";

  const payload = await fetch(`${process.env.API}/orders`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const data = await payload.json();
  console.log(data , 'data');
  
  return data.orders;
}
